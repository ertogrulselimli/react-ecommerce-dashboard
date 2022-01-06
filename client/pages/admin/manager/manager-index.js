import React from "react";
import api from "../../../api";
import { Card, CardBody, CardTitle } from "reactstrap";
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";
import ActionButtons from "../../../components/form-elements/action-buttons";
import MXReactTable from '../common/mx-react-table';
import MXForm from "./components/manager-form";
import CenterCircularProgress from "../../../components/ui-elements/center-circular-progress";
import MXAlerts from "../common/mx-alerts";
import managerColumns from "./components/manager-table-columns";
import { managerFilterUrl} from "../common/constants";
import {addNewItem, onClickRow, refresh} from "../common/mx-common-index-exports";


const messages = defineMessages({
  managerUpdateSuccessMsg: {
    id: "manager.update_success_msg",
    defaultMessage: "Manager updated successfully"
  },
  managerCreatedSuccessMsg: {
    id: "manager.create_success_msg",
    defaultMessage: "Manager created successfully"
  },
  resetPasswordButtonTitle: {
    id: "manager.reset_password_button_title",
    defaultMessage: "Reset password"
  },
  resetPasswordSuccessMsg: {
    id: "manager.reset_password_success_message",
    defaultMessage: "New code has been sent to manager`s email"
  }
});

class ManagerIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // list: [],
      // selected: null,
      // initialSearch: true,
      // loading: false,
      managerRoles: [],
      showForm: false,
      selectedEntity: null,
      selectedIndex: null,
      saving:false,
      form: {},
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

  componentDidMount() {

    api.get("vendors/role/all").then(response => {
      this.setState({ managerRoles: response.data });
    });
  }

  edit() {
    api
      .get(`vendors/manager/${this.state.selectedEntity.id}`)
      .then(response => {
        this.setState({ showForm: true, form: response.data });
      });
  }

  back() {
    this.setState({ showForm: false });
  }

  save(e) {
    this.formSubmit();
  }

  dissmissAlert() {
    this.setState({ alertMsg: null, sweetAlertMsg: null });
  }

  submit(data) {
    this.setState({ saving: true });

    let result = data.managerId
      ? api.put("vendors/manager", data)
      : api.post("vendors/manager", data);

    result
      .then(response => {
        this.setState({
          saving: false,
          showForm: false,
          alertMsg: this.props.intl.formatMessage(
            data.managerId
              ? messages.managerUpdateSuccessMsg
              : messages.managerCreatedSuccessMsg
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

  resetPassword() {
    if (this.state.resetPasswordLoading) return;
    this.setState({ resetPasswordLoading: true });

    api
      .post("vendors/manager/password-reset/init", {
        email: this.state.list[this.state.selected].email
      })
      .then(() => {
        this.setState({
          resetPasswordLoading: false,
          alertMsg: this.props.intl.formatMessage(
            messages.resetPasswordSuccessMsg
          )
        });
        setTimeout(() => this.dissmissAlert(), 2000);
      })
      .catch(error => {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : "something went wrong";

        this.setState({ resetPasswordLoading: false, sweetAlertMsg: message });
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
                  id="managers.title"
                  defaultMessage="Managers"
                />
              </CardTitle>
            </div>
            <div className="col-lg-9">
              <ActionButtons
                hideBack={!this.state.showForm}
                disableSave={!this.state.showForm || this.state.saving}
                disableEdit={this.state.selectedEntity === null}
                disableRefresh={this.state.showForm}
                disablePasswordReset={
                  this.state.selected === null ||
                  this.state.resetPasswordLoading
                }
                onClickAdd={this.add}
                onClickBack={this.back.bind(this)}
                onClickRefresh={this.refresh}
                onClickEdit={this.edit.bind(this)}
                onClickSave={this.save.bind(this)}
                onClickPasswordReset={this.resetPassword.bind(this)}
                addButtons={[
                  {
                    name: "PasswordReset",
                    type: "default",
                    title: this.props.intl.formatMessage(
                      messages.resetPasswordButtonTitle
                    ),
                    icon: "fa fa-key"
                  }
                ]}
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
                columns={managerColumns}
                onClickRow={this.onClickRow}
                selectedIndex={this.state.selectedIndex}
                filterUrl={managerFilterUrl}
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
                    managerRoles={this.state.managerRoles}
                    langs={this.props.auth.langs}
                />:null}
          </div>

        </CardBody>
      </Card>
    );
  }
}

export default injectIntl(ManagerIndex);
