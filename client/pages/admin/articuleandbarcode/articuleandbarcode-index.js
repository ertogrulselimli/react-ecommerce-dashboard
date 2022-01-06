/**
 * Created by Administrator on 3/4/2019.
 */

import React from "react";
import api from "../../../api";
import { Card, CardBody, CardTitle, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import ActionButtons from "../../../components/form-elements/action-buttons";
import ArticuleandbarcodeTable from "./components/articuleandbarcode-table";
import ArticuleandbarcodeForm from "./components/articuleandbarcode-form";
import ArticuleandbarcodeFilterPanel from "./components/articuleandbarcode-filter-panel";
import SweetAlert from "react-bootstrap-sweetalert";
import FilterInput from "../../../components/form-elements/filter-input";
import { injectIntl, defineMessages } from "react-intl";
import CenterCircularProgress from "../../../components/ui-elements/center-circular-progress";

const messages = defineMessages({
  updateSuccessMsg: {
    id: "articule.barcode.update_success_msg",
    defaultMessage: "Articule and Barcode updated successfully"
  },
  createdSuccessMsg: {
    id: "articule.barcode.create_success_msg",
    defaultMessage: "Articule and Barcode created successfully"
  }
});

class ArticuleandbarcodeIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      list: [],
      selected: null,
      showForm: false,
      initialSearch: true,
      filter: {
        categoryId: 0,
        filter: "",
        productId: 0,
        shopId: 0
      },
      page: 0,
      categories: []
    };

    this.fetchTimeout = false;

    this.tableState = {
      page: 0,
      pageSize: 10
    };
  }

  componentDidMount() {
    api
      .get("catalog/category/tree")
      .then(response => this.setState({ categories: response.data }));
  }

  onChangeFilter(filter, value) {
    //console.log(filter, value);
    this.setState({ filter: { ...this.state.filter, [filter]: value } }, () =>
      this.getArticulesAndBarcodes()
    );
  }

  getArticulesAndBarcodes(state) {
    if (this.fetchTimeout) clearTimeout(this.fetchTimeout);
    state = state || this.tableState;
    let Fetch = () => {
      this.setState({ loading: true, selected: null });
      this.tableState = state;
      // let filter = {};
      let filter = {
        ...this.state.filter
      };
      api
        .post(
          `articules-and-barcodes/articule-and-barcode/filtered?page=${
            state.page
          }&size=${state.pageSize}`,
          { ...filter }
        )
        .then(response => {
          this.setState({
            list: response.data.content,
            loading: false,
            initialSearch: false,
            page: Math.ceil(response.data.totalElements / state.pageSize)
          });
        });
    };
    this.fetchTimeout = setTimeout(() => {
      Fetch();
    }, 0);
  }

  onClickRow(row) {
    this.setState(state => {
      state.selected = row.index === state.selected ? null : row.index;
      return state;
    });
  }

  edit() {
    let articuleAndBarcode = this.state.list[this.state.selected];
    api
      .get(
        `articules-and-barcodes/articule-and-barcode/${articuleAndBarcode.id}`
      )
      .then(response => {
        this.setState({ showForm: true, form: response.data });
      });
  }

  add() {
    this.setState({ selected: null, showForm: true, form: {} });
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

  delete() {}

  submit(data) {
    this.setState({ saving: true });

    const requests = [];
    let requestData = { ...data };

    requests.push(
      data.id
        ? api.put("articules-and-barcodes/articule-and-barcode", requestData)
        : api.post("articules-and-barcodes/articule-and-barcode", requestData)
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
        this.getArticulesAndBarcodes();
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
          <CardTitle>
            <FormattedMessage
              id="articuleandbarcode.title"
              defaultMessage="Articule and Barcode"
            />
          </CardTitle>

          <CenterCircularProgress
            portal
            show={this.state.saving}
            size={60}
            delay={800}
          />

          <div className="row">
            <div className="col-8">
              <ArticuleandbarcodeFilterPanel
                onChange={this.onChangeFilter.bind(this)}
                filter={this.state.filter}
              />
            </div>
            <div className="col-4">
              <ActionButtons
                hideAdd={this.props.auth.isShopManager()}
                hideSave={this.props.auth.isShopManager()}
                hideDelete={this.props.auth.isShopManager()}
                hideBack={!this.state.showForm}
                disableSave={!this.state.showForm || this.state.saving}
                disableEdit={this.state.selected === null}
                disableRefresh={this.state.showForm}
                confirmDelete={true}
                onClickAdd={this.add.bind(this)}
                onClickBack={this.back.bind(this)}
                onClickRefresh={this.getArticulesAndBarcodes.bind(this)}
                onClickEdit={this.edit.bind(this)}
                onClickSave={this.save.bind(this)}
              />
            </div>
          </div>

          <Alert
            type="success"
            isOpen={!!this.state.alertMsg}
            toggle={this.dissmissAlert.bind(this)}
          >
            {this.state.alertMsg}
          </Alert>

          <SweetAlert
            show={!!this.state.sweetAlertMsg}
            error
            confirmBtnText="Ok"
            confirmBtnBsStyle="danger"
            btnSize="xs"
            title=""
            onConfirm={this.dissmissAlert.bind(this)}
            onCancel={this.dissmissAlert.bind(this)}
          >
            {this.state.sweetAlertMsg}
          </SweetAlert>

          <ArticuleandbarcodeTable
            show={!this.state.showForm}
            loading={this.state.loading}
            list={this.state.list}
            onClickRow={this.onClickRow.bind(this)}
            selectedIndex={this.state.selected}
            pages={this.state.page}
            initialSearch={this.state.initialSearch}
          />

          {this.state.showForm ? (
            <ArticuleandbarcodeForm
              bindSubmit={e => (this.formSubmit = e)}
              formData={this.state.form}
              onSubmit={this.submit.bind(this)}
              categories={this.state.categories}
            />
          ) : null}
        </CardBody>
      </Card>
    );
  }
}

export default injectIntl(ArticuleandbarcodeIndex);
