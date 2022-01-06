import React from "react";
import api from "../../../api";
import { Card, CardBody, CardTitle, Alert } from "reactstrap";

import { FormattedMessage } from "react-intl";
import ActionButtons from "../../../components/form-elements/action-buttons";
import PriceListTable from "./components/price-list-table";
import PriceListForm from "./components/price-list-form";
import { injectIntl, defineMessages } from "react-intl";
import SweetAlert from "react-bootstrap-sweetalert";
import FilterInput from "../../../components/form-elements/filter-input";
import CenterCircularProgress from "../../../components/ui-elements/center-circular-progress";

const messages = defineMessages({
  updateSuccessMsg: {
    id: "price.list.update_success_msg",
    defaultMessage: "Price list updated successfully"
  },
  createdSuccessMsg: {
    id: "price.list.create_success_msg",
    defaultMessage: "Price list created successfully"
  }
});

class PriceListIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      list: [],
      selected: null,
      showForm: false,
      filter: ""
    };
  }

  onChangeFilter(value) {
    this.setState({ filter: value });
    this.getPriceLists();
  }

  getPriceLists() {
    this.setState({ loading: true });

    api
      .post("catalog/pricelist/filter", this.state.filter, {
        headers: {
          "Content-Type": "text/plain"
        }
      })
      .then(response => {
        this.setState({ list: response.data, loading: false });
      });
  }

  onClickRow(row) {
    this.setState(state => {
      state.selected = row.index === state.selected ? null : row.index;
      return state;
    });
  }

  edit() {
    api
      .get(`catalog/pricelist/${this.state.list[this.state.selected].id}`)
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

  delete() {
    // api
    //   .post(`cities/city/delete/${this.state.list[this.state.selected].id}`)
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     this.setState({
    //       sweetAlertMsg: error.response
    //         ? error.response.data.message
    //         : "something went wrong"
    //     });
    //   });
  }

  submit(data) {
    this.setState({ saving: true });

    let result = data.id
      ? api.put("catalog/pricelist", data)
      : api.post("catalog/pricelist", data);

    result
      .then(response => {
        this.setState({
          saving: false,
          showForm: false,
          alertMsg: this.props.intl.formatMessage(
            data.id ? messages.updateSuccessMsg : messages.createdSuccessMsg
          )
        });
        this.getPriceLists();

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
                  id="price.list.title"
                  defaultMessage="Price list"
                />
              </CardTitle>
            </div>
            <div className="col-9">
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
                onClickDelete={this.delete.bind(this)}
                onClickRefresh={this.getPriceLists.bind(this)}
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

          <PriceListTable
            show={!this.state.showForm}
            loading={this.state.loading}
            list={this.state.list}
            onClickRow={this.onClickRow.bind(this)}
            selectedIndex={this.state.selected}
            pages={this.state.total}
          />

          {this.state.showForm ? (
            <PriceListForm
              bindSubmit={e => (this.formSubmit = e)}
              formData={this.state.form}
              onSubmit={this.submit.bind(this)}
            />
          ) : null}
        </CardBody>
      </Card>
    );
  }
}

export default injectIntl(PriceListIndex);
