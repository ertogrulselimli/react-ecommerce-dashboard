import React from "react";
import api from "../../../api";
import { Card, CardBody, CardTitle } from "reactstrap";
import { defineMessages, FormattedMessage, injectIntl } from "react-intl";
import ActionButtons from "../../../components/form-elements/action-buttons";
import MXReactTable from "../common/mx-react-table";
import MXForm from "./components/brands-form";
import CenterCircularProgress from "../../../components/ui-elements/center-circular-progress";
import MXAlerts from "../common/mx-alerts";
import brandColumns from "./components/brand-table-columns";
import { brandFilterUrl } from "../common/constants";
import {
  onClickRow,
  refresh,
  addNewItem
} from "../common/mx-common-index-exports";

const navLinks = defineMessages({
  main: {
    id: "brand.form.link.main_information",
    defaultMessage: "Əsas məlumatlar"
  },
  localization: {
    id: "brand.form.link.localization",
    defaultMessage: "Localization"
  }
});

const messages = defineMessages({
  updateSuccessMsg: {
    id: "brands.update_success_msg",
    defaultMessage: "Brand updated successfully"
  },
  createdSuccessMsg: {
    id: "brands.create_success_msg",
    defaultMessage: "Brand created successfully"
  },
  deleteSuccessMessage: {
    id: "brands.delete_success_msg",
    defaultMessage: "Brand deleted successfully"
  }
});

class BrandsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntity: null,
      selectedIndex: null,
      showForm: false,
      saving: false,
      form: {}
    };

    this.defaultFilters = [
      {
        id: "active",
        value: {
          value: "YES",
          label: "yes"
        }
      }
    ];
    this.dissmissAlert = this.dissmissAlert.bind(this);
    this.mxReactTableRef = React.createRef();
    this.onClickRow = onClickRow.bind(this);
    this.refresh = refresh.bind(this);
    this.add = addNewItem.bind(this);
  }

  edit() {
    api.get(`brands/brand/${this.state.selectedEntity.id}`).then(response => {
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

  delete() {
    const brand = this.state.selectedEntity;
    api.post(`brands/brand/delete/${brand.id}`).then(response => {
      if (response.data.response === "ERROR") {
        this.setState({
          saving: false,
          sweetAlertMsg: this.renderDeleteErrorMessage(
            response.data.errorText,
            brand
          )
        });
      } else {
        this.setState({
          alertMsg: this.props.intl.formatMessage(messages.deleteSuccessMessage)
        });
        this.refresh();
        setTimeout(() => this.dissmissAlert(), 2000);
      }
    });
  }

  submit(data) {
    this.setState({ saving: true });

    let result = data.id
      ? api.put("brands/brand", data)
      : api.post("brands/brand", data);

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

  renderDeleteErrorMessage(errorText, brand) {
    return (
      <div>
        {errorText}
        <p
          className="text-primary c-pointer"
          onClick={e => {
            this.props.tabActions.openTab("product", {
              filtered: [
                {
                  id: "brandId",
                  value: { value: brand.id, label: brand.description }
                }
              ]
            });
          }}
        >
          Show products
        </p>
      </div>
    );
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
                <FormattedMessage id="brands.title" defaultMessage="Brands" />
              </CardTitle>
            </div>

            <div className="col-9">
              <ActionButtons
                hideAdd={this.props.auth.isShopManager()}
                hideSave={this.props.auth.isShopManager()}
                hideDelete={this.props.auth.isShopManager()}
                hideBack={!this.state.showForm}
                disableSave={!this.state.showForm || this.state.saving}
                disableEdit={this.state.selectedEntity === null}
                disableDelete={this.state.selectedEntity === null}
                disableRefresh={this.state.showForm}
                confirmDelete={true}
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

          <div
            style={
              this.state.showForm === true
                ? {
                    visibility: "hidden",
                    maxHeight: "0",
                    overflow: "hidden"
                  }
                : {}
            }
          >
            <MXReactTable
              ref={this.mxReactTableRef}
              columns={brandColumns}
              onClickRow={this.onClickRow}
              selectedIndex={this.state.selectedIndex}
              filterUrl={brandFilterUrl}
              showTextFilterInput={true}
              defaultFilters={this.defaultFilters}
            />
          </div>
          <div
            style={
              this.state.showForm === false
                ? {
                    visibility: "hidden",
                    maxHeight: "0",
                    overflow: "hidden"
                  }
                : {}
            }
          >
            {this.state.showForm ? (
              <MXForm
                formData={this.state.form}
                submit={this.submit.bind(this)}
                bindSubmit={e => (this.formSubmit = e)}
              />
            ) : null}
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default injectIntl(BrandsIndex);
