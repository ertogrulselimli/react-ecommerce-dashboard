import React from "react";
import api from "../../../api";
import { Card, CardBody, CardTitle, Alert } from "reactstrap";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import ActionButtons from "../../../components/form-elements/action-buttons";
import MXReactTable from "../../../components/react-table/tg-react-table-intl";
import ProductForm from "./components/product-form";
import { injectIntl, defineMessages } from "react-intl";
import CenterCircularProgress from "../../../components/ui-elements/center-circular-progress";
import { omit } from "../../../helpers";
import onFetchData from "../common/on-fetch-data";
import columns from "./components/product-table-columns";
import MXAlerts from "../common/mx-alerts";

const messages = defineMessages({
  updateSuccessMsg: {
    id: "product.update_success_msg",
    defaultMessage: "Product updated successfully"
  },
  createdSuccessMsg: {
    id: "product.create_success_msg",
    defaultMessage: "Product created successfully"
  },
  fillMandatoryAttributesMsg: {
    id: "product.fill_mandatory_attribute_msg",
    defaultMessage: "Please fill all mandatory attributes before submit"
  }
});

class ProductIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      list: [],
      initialSearch: true,
      selected: null,
      showForm: false,
      categories: [],
      filtered: props.filtered || [],
      uniteOfMeasurements: [],
      shops: [],
      page: 0,
      alert: {
        show: false
      }
    };

    this.fetchTimeout = false;
    this.filterUrl = `catalog/product/products/filtered/`;
    this.onFetchData = onFetchData.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isShopOwner()) {
      api.get("shop/shops/all").then(response => {
        this.setState({ shops: response.data });
      });
    }

    api
      .get("catalog/category/tree")
      .then(response => this.setState({ categories: response.data }));

    api
      .post(`measure-units/filtered/0/100/YES`, "", {
        headers: {
          "Content-Type": "text/plain"
        }
      })
      .then(response => {
        this.setState({ uniteOfMeasurements: response.data });
      });
  }

  onClickRow(row) {
    this.setState(state => {
      state.selected = row.index === state.selected ? null : row.index;
      return state;
    });
  }

  attributesChange(attributes) {
    this.setState({
      attributes: attributes,
      attributesChanged: true
    });
  }

  edit() {
    this.setState({ loadingProduct: true });

    api
      .get(`catalog/product/${this.state.list[this.state.selected].id}`)
      .then(response => {
        this.setState({
          showForm: true,
          form: response.data,
          loadingProduct: false
        });
      });
  }

  add() {
    this.setState({ selected: null, showForm: true, form: {} });
  }

  back() {
    this.setState({
      showForm: false,
      attributesChanged: false,
      attributes: []
    });
  }

  save() {
    this.formSubmit();
  }

  dissmissAlert() {
    this.setState({
      alert: {
        show: false,
        color: "success",
        message: null
      }
    });
  }

  submit(data) {
    this.setState({ saving: true });
    //save attributes
    const requests = [];
    let requestData = { ...data };
    if (this.state.attributesChanged) {
      requestData.productAttrValueVms = this.state.attributes
        .map(attribute => {
          if (attribute.crud) {
            return {
              crud: attribute.crud,
              productAttrValueDTO: {
                attributeValueId: attribute.attributeValue.id,
                productTypeAttrId: attribute.productTypeAttr.id,
                productId: attribute.productId,
                id: attribute.id
              }
            };
          }
        })
        .filter(notUndefined => notUndefined);
    }
    // //filter unchanged media files
    requestData.productMedias = requestData.productMedias
      .filter(file => file.data.crud && (!file.id || file.data.crud !== "d"))
      .map(file => file.data);

    requestData.articulesVMS = data.articules
      .filter(articule => {
        return articule.crud && !(!articule.id && articule.crud === "d");
      })
      .map(articule => ({
        articule: omit(articule, ["crud", "prevCrud"]),
        crud: articule.crud
      }));

    requestData.barcodesVMS = data.barcodes
      .filter(barcode => {
        return barcode.crud && !(!barcode.id && barcode.crud === "d");
      })
      .map(barcode => ({
        barcode: omit(barcode, ["crud", "prevCrud"]),
        crud: barcode.crud
      }));

    delete requestData.articules;
    delete requestData.barcodes;

    requests.push(
      data.id
        ? api.put("catalog/product", requestData)
        : api.post("catalog/product", requestData)
    );
    axios
      .all(requests)
      .then(response => {
        this.setState({
          saving: false,
          form: {},
          alert: {
            show: true,
            message: this.props.intl.formatMessage(
              data.id ? messages.updateSuccessMsg : messages.createdSuccessMsg
            ),
            color: "success"
          }
        });
        this.back();
        this.onFetchData();
        setTimeout(() => this.dissmissAlert(), 2000);
      })
      .catch(error => {
        if (error.response) {
          this.setState({ saving: false });
          this.props.alertActions.showRequestError(error);
        }
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
                  id="products.title"
                  defaultMessage="Products"
                />
              </CardTitle>
            </div>
            <div className="col-9">
              <ActionButtons
                hideBack={!this.state.showForm}
                disableSave={!this.state.showForm || this.state.saving}
                disableEdit={this.state.selected === null}
                disableRefresh={this.state.showForm}
                confirmDelete={true}
                onClickAdd={this.add.bind(this)}
                onClickBack={this.back.bind(this)}
                onClickDelete={this.back.bind(this)}
                onClickRefresh={this.onFetchData.bind(this)}
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

          <MXReactTable
            columns={columns}
            show={!this.state.showForm}
            loading={this.state.loading}
            list={this.state.list}
            onClickRow={this.onClickRow.bind(this)}
            selectedIndex={this.state.selected}
            initialSearch={this.state.initialSearch}
            pages={this.state.page}
            onFetchData={this.onFetchData.bind(this)}
            filtered={this.state.filtered}
            showTextFilterInput={true}
          />

          {this.state.showForm ? (
            <ProductForm
              bindSubmit={e => (this.formSubmit = e)}
              formData={this.state.form}
              onSubmit={this.submit.bind(this)}
              shops={this.state.shops}
              categories={this.state.categories}
              uniteOfMeasurements={this.state.uniteOfMeasurements}
              auth={this.props.auth}
              onAttributesChange={this.attributesChange.bind(this)}
            />
          ) : null}
        </CardBody>
      </Card>
    );
  }
}

export default injectIntl(ProductIndex);
