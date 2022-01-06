import React from "react";
import api from "../../../api";
import { Card, CardBody, CardTitle } from "reactstrap";
import { FormattedMessage, injectIntl, defineMessages } from "react-intl";
import ActionButtons from "../../../components/form-elements/action-buttons";
import MXReactTable from "../common/mx-react-table";
import MXAlerts from "../common/mx-alerts";
import {onClickRow, refresh, addNewItem} from '../common/mx-common-index-exports';
import { unitOfMeasurementFilterUrl} from '../common/constants'
import MXForm from "./components/unit-of-measurement-form";
import columns from "./components/unit-of-measurement-table-columns";
import CenterCircularProgress from "../../../components/ui-elements/center-circular-progress";

const messages = defineMessages({
  updateSuccessMsg: {
    id: "unit_of_measurement.update_success_msg",
    defaultMessage: "Unit updated successfully"
  },
  createdSuccessMsg: {
    id: "unit_of_measurement.create_success_msg",
    defaultMessage: "Unit created successfully"
  },
  deleteSuccessMessage: {
    id: "unit_of_measurement.delete_success_msg",
    defaultMessage: "Unit deleted successfully"
  }
});

class UnitOfMeasurementIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntity: null,
      selectedIndex: null,
      showForm: false,
      saving:false,
      form: {}
    };

    this.defaultFilters = [{
      id: 'active',
      value: {
        value: 'YES',
        label: 'yes'
      }
    }]

    this.dissmissAlert = this.dissmissAlert.bind(this);
    this.mxReactTableRef = React.createRef();
    this.onClickRow=onClickRow.bind(this);
    this.refresh=refresh.bind(this);
    this.add=addNewItem.bind(this);
  }

  edit() {
    api
        .get(`measure-unit/${this.state.selectedEntity.id}`)
        .then(response => {
          this.setState({ showForm: true, form: response.data });
        });
  }

  back() {
    this.setState({ showForm: false });
  }

  save() {
    this.formSubmit();
  }

  dissmissAlert() {
    this.setState({ alertMsg: null, sweetAlertMsg: null });
  }

  delete() {
    const unit = this.state.list[this.state.selected];
    api.post(`measure-unit/delete/${unit.id}`).then(response => {
      if (response.data.response === "ERROR") {
        this.setState({
          saving: false,
          sweetAlertMsg: this.renderDeleteErrorMessage(
              response.data.errorText,
              unit
          )
        });
      } else {
        this.setState({
          alertMsg: this.props.intl.formatMessage(messages.deleteSuccessMessage)
        });
        setTimeout(() => this.dissmissAlert(), 2000);
      }
    });
  }

  submit(data) {
    this.setState({ saving: true });

    let result = data.id
        ? api.put("measure-unit", data)
        : api.post("measure-unit", data);

    result
        .then(response => {
          this.setState({
            saving: false,
            showForm: false,
            alertMsg: this.props.intl.formatMessage(
                data.id ? messages.updateSuccessMsg : messages.createdSuccessMsg
            )
          });
          this.refresh();

          setTimeout(() => this.dissmissAlert(), 2000);
        })
        .catch(error => {
          //TODO Check data message exists
          this.setState({
            saving: false,
            sweetAlertMsg: error.response.data.message
          });
        });
  }

  render() {
    return (
        <Card>
          <CardBody>
            <CenterCircularProgress
                portal
                show={this.state.saving}
                size={60}
                delay={800}
            />

            <div className="row">
              <div className="col-3">
                <CardTitle>
                  <FormattedMessage
                      id="unit_of_measurement.title"
                      defaultMessage="Unit of measurements"
                  />
                </CardTitle>
              </div>

              <div className="col-9">
                <ActionButtons
                    hideBack={!this.state.showForm}
                    disableSave={!this.state.showForm || this.state.saving}
                    disableEdit={this.state.selectedEntity === null}
                    disableDelete={this.state.selectedEntity === null}
                    confirmDelete={true}
                    disableRefresh={this.state.showForm}
                    onClickAdd={this.add}
                    onClickBack={this.back.bind(this)}
                    onClickDelete={this.delete.bind(this)}
                    onClickRefresh={this.refresh}
                    onClickEdit={this.edit.bind(this)}
                    onClickSave={this.save.bind(this)}
                />
              </div>
            </div>

            <MXAlerts
                alertMessage={this.state.alertMsg}
                sweetAlertMessage={this.state.sweetAlertMsg}
                toggleAlert={this.dissmissAlert}
                toggleSweetAlert={this.dissmissAlert}
            />

            <div style={ this.state.showForm === true ? {
              visibility: "hidden",
              maxHeight: "0",
              overflow: 'hidden'
            } : {}}>
              <MXReactTable
                  ref={this.mxReactTableRef}
                  columns={columns}
                  onClickRow={this.onClickRow}
                  selectedIndex={this.state.selectedIndex}
                  filterUrl={unitOfMeasurementFilterUrl}
                  showTextFilterInput={true}
                  defaultFilters={this.defaultFilters}
              />
            </div>
            <div style={this.state.showForm === false ? {
              visibility: "hidden",
              maxHeight: "0",
              overflow: 'hidden'
            } : {}}>
              {this.state.showForm?
                  <MXForm
                      formData={this.state.form}
                      submit={this.submit.bind(this)}
                      bindSubmit={e => (this.formSubmit = e)}
                  />:null}
            </div>
          </CardBody>
        </Card>
    );
  }
}

export default injectIntl(UnitOfMeasurementIndex);
