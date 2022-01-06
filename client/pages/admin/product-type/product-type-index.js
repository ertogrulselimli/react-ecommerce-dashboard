import React from "react";
import api from "../../../api";
import { Card, CardBody, CardTitle } from "reactstrap";
import { defineMessages, FormattedMessage, injectIntl } from "react-intl";
import ActionButtons from "../../../components/form-elements/action-buttons";
import MXReactTable from '../common/mx-react-table';
import  MXForm from "./components/product-type-form";
import CenterCircularProgress from "../../../components/ui-elements/center-circular-progress";
import MXAlerts from "../common/mx-alerts";
import productTypeColumns from "./components/product-type-table-columns";
import { productTypeFilterUrl} from '../common/constants';
import {onClickRow,refresh,addNewItem} from '../common/mx-common-index-exports';

const messages = defineMessages({
  // productTypeDeletedSuccessMsg: {
  //   id: "product_type.delete_success_msg",
  //   defineMessages: "Product type deleted successfully"
  // },
  productTypeUpdateSuccessMsg: {
    id: "product_type.update_success_msg",
    defaultMessage: "Product type updated successfully"
  },
  productTypeCreatedSuccessMsg: {
    id: "product_type.create_success_msg",
    defaultMessage: "Product type created successfully"
  }
});

class ProductTypeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntity: null,
      selectedIndex: null,
      showForm: false,
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

  edit() {
    api.get(`catalog/producttype/${this.state.selectedEntity.id}`).then(response => {
      this.setState({showForm: true,
        form: response.data});
    });
  }

  back() {
    this.setState({ showForm: false, attributesChanged: false });
  }

  save(e) {
    this.formSubmit();
  }

  dissmissAlert() {
    this.setState({ alertMsg: null, sweetAlertMsg: null });
  }

  delete() {
    const prodtype = this.state.selectedEntity;
    api.post(`catalog/producttype/delete/${prodtype.id}`).then(response => {
      if (response.data.response === "ERROR") {
        this.setState({
          saving: false,
          sweetAlertMsg: this.renderDeleteErrorMessage(
              response.data.errorText,
              prodtype
          )
        });
      } else {
        this.setState({
          alertMsg: this.props.intl.formatMessage(messages.productTypeDeletedSuccessMsg)
        });
        this.refresh();
        setTimeout(() => this.dissmissAlert(), 2000);
      }
    });
  }

  renderDeleteErrorMessage(errorText, prodtype) {
    return (
        <div>
          {errorText}
          <p
              className="text-primary c-pointer"
              onClick={e => {
                this.props.tabActions.openTab("product", {
                  filtered: [
                    {
                      id: "productTypeId",
                      value: {value: prodtype.id, label: prodtype.description}
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

  submit(formData) {
    this.setState({ saving: true });
    let data = { ...formData };
    //console.log(data.attributes);
    data.productTypeAttrVms = data.attributes
      .filter(attr => attr.crud && !(!attr.id && attr.crud === "d"))
      .map(({ crud, attribute, initalCreate, ...attr }) => {
        return {
          productTypeAttrDTO: { ...attr, attributeId: attribute.id },
          crud: crud
        };
      });

    delete data.attributes;
    let request = data.id
      ? api.put("catalog/producttype", data)
      : api.post("catalog/producttype", data);
    request
      .then(response => {
        this.setState({
          saving: false,
          alertMsg: this.props.intl.formatMessage(
            data.id
              ? messages.productTypeUpdateSuccessMsg
              : messages.productTypeCreatedSuccessMsg
          )
        });
        this.back();
        this.refresh();
        setTimeout(() => this.dissmissAlert(), 2000);
      })
      .catch(error => {
        if (error.request) {
          this.setState({ saving: false, sweetAlertMsg: error.message });
        }
        console.log(error);
      });
  }

  render() {
    return (
      <Card>
        <CardBody>
          <div className="row">
            <div className="col-3">
              <CardTitle>
                <FormattedMessage
                  id="product_types.title"
                  defaultMessage="Product types"
                />
              </CardTitle>
            </div>

            <CenterCircularProgress
              portal
              show={this.state.saving}
              size={60}
              delay={800}
            />

            <div className="col-9">
              <ActionButtons
                hideAdd={this.props.auth.isShopManager()}
                hideBack={!this.state.showForm}
                hideDelete={this.props.auth.isShopManager()}
                hideSave={this.props.auth.isShopManager()}
                disableSave={!this.state.showForm || this.state.saving}
                disableEdit={this.state.selectedEntity === null}
                disableDelete={this.state.selectedEntity === null}
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
                columns={productTypeColumns}
                onClickRow={this.onClickRow}
                selectedIndex={this.state.selectedIndex}
                filterUrl={productTypeFilterUrl}
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
                    auth={this.props.auth}
                />:null}
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default injectIntl(ProductTypeIndex);
