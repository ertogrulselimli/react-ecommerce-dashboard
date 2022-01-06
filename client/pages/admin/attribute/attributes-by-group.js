import React from "react";
import ReactDOM from "react-dom";
import api from "../../../api";
import ActionButtons from "../../../components/form-elements/action-buttons";
import MXReactTable from "../../../components/react-table/tg-react-table-intl";
import AttributeForm from "./components/attribute-form";
import { defineMessages, injectIntl } from "react-intl";
import onFetchData from "../common/on-fetch-data";
import columns from "./components/attribute-table-columns";
import MXAlerts from "../common/mx-alerts";

const messages = defineMessages({
  attributeUpdateSuccessMsg: {
    id: "attribute.update_success_msg",
    defaultMessage: "Attribute updated successfully"
  },
  attributeCreatedSuccessMsg: {
    id: "attribute.create_success_msg",
    defaultMessage: "Attribute created successfully"
  },
  deleteSuccessMessage: {
    id: "attribute.delete_success_msg",
    defaultMessage: "Attribute deleted successfully"
  }
});

const body = document.getElementById("root");

class AttributesByGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      list: [],
      attributeTypes: ["LIST", "TEXT"],
      selected: null,
      showForm: false,
      form: {},
      page: 0,
      filtered: props.filter || [
        {
          id: "active",
          value: { value: "YES", label: "Yes" }
        }
      ],
      initialSearch: true
    };

    this.additionalFilters = [{ id: "group", value: props.selectedGroup.code }];
    this.filterUrl = `attributes/attribute/filtered/`;
    this.onFetchData = onFetchData.bind(this);
    this.fetchTimeout = false;
  }

  componentDidMount() {}

  onClickRow(row) {
    this.setState(state => {
      state.selected = row.index === state.selected ? null : row.index;
      return state;
    });
  }

  edit() {
    api
      .get(`attributes/attribute/${this.state.list[this.state.selected].id}`)
      .then(response => {
        this.setState({ showForm: true, form: response.data });
      });
  }

  add() {
    this.setState({ selected: null, showForm: true, form: {} });
  }

  back() {
    if (this.state.showForm) {
      this.setState({ showForm: false });
    } else {
      this.props.onClickBack();
      this.setState({ list: [] });
    }
  }

  save() {
    this.formSubmit();
  }

  refresh() {
    this.onFetchData();
  }

  dissmissAlert() {
    this.setState({ alertMsg: null, sweetAlertMsg: null });
  }

  delete() {
    let attribute = this.state.list[this.state.selected];
    api
      .post(`attributes/attribute/delete/${attribute.id}`)
      .then(response => {
        this.setState({
          alertMsg: this.props.intl.formatMessage(messages.deleteSuccessMessage)
        });
        setTimeout(() => this.dissmissAlert(), 2000);
      })
      .catch(e => {
        this.setState({
          saving: false,
          sweetAlertMsg: this.renderDeleteErrorMessage(e.response, attribute)
        });
      });
  }

  submit(data) {
    this.setState({ saving: true });

    data = { ...data };

    data.attributeValueVms = data.attributeValues
      .filter(a => a.crud && !(!a.id && a.crud === "d"))
      .map(({ crud, ...attribute }) => {
        return { attributeValueDTO: { ...attribute }, crud: crud };
      });

    data.attributeMeasurementsVms = data.attributeMeasurements
      .filter(u => u.crud && !(u.previousCrud === "i" && u.crud === "d"))
      .map(unit => {
        return {
          attributeMeasurementsDTO: {
            id: unit.uId,
            unitOfMeasurementId: unit.id
          },
          crud: unit.crud
        };
      });

    delete data.attributeValues;
    delete data.attributeMeasurements;
    if (!data.attributeMeasurementsVms.length)
      delete data.attributeMeasurementsVms;
    if (!data.attributeValueVms.length) delete data.attributeValueVms;

    let result = data.id
      ? api.put("attributes/attribute", data)
      : api.post("attributes/attribute", data);

    result
      .then(response => {
        this.setState({
          saving: false,
          showForm: false,
          alertMsg: this.props.intl.formatMessage(
            data.id
              ? messages.attributeUpdateSuccessMsg
              : messages.attributeCreatedSuccessMsg
          )
        });
        this.onFetchData();
      })
      .catch(error => {
        this.setState({
          saving: false,
          sweetAlertMsg: error.response
            ? error.response.data.message
            : "something went wrong"
        });

        console.log(error);
      });
  }

  renderDeleteErrorMessage(error, attribute) {
    return <div>{error ? error.data.message : "Something went wrong"}</div>;
  }

  render() {
    if (!this.props.selectedGroup) return null;

    return (
      <div>
        <div className="row">
          <div className="col-3">
            {/* <FilterInput
                         label={"Search"}
                         onChange={this.onChangeFilter.bind(this)}
                         timeout={500}
                         hide={this.state.showForm}
                         /> */}
          </div>
          <div className="col-9">
            <ActionButtons
              hideAdd={this.props.auth.isShopManager()}
              hideSave={this.props.auth.isShopManager()}
              hideDelete={this.props.auth.isShopManager()}
              disableSave={!this.state.showForm || this.state.saving}
              disableEdit={this.state.selected === null}
              disableDelete={this.state.selected === null}
              disableRefresh={this.state.showForm}
              onClickDelete={this.delete.bind(this)}
              confirmDelete={this.delete.bind(this)}
              onClickAdd={this.add.bind(this)}
              onClickBack={this.back.bind(this)}
              onClickRefresh={this.refresh.bind(this)}
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

        {/* <Alert
          type="success"
          isOpen={!!this.state.alertMsg}
          toggle={this.dissmissAlert.bind(this)}
        >
          {this.state.alertMsg}
        </Alert>

        {ReactDOM.createPortal(
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
          </SweetAlert>,
          body
        )} */}

        <MXReactTable
          columns={columns}
          show={!this.state.showForm}
          loading={this.state.loading}
          list={this.state.list}
          onClickRow={this.onClickRow.bind(this)}
          selectedIndex={this.state.selected}
          attributeTypes={this.state.attributeTypes}
          filtered={this.state.filtered}
          initialSearch={this.state.initialSearch}
          onFetchData={this.onFetchData.bind(this)}
          pages={this.state.page}
          showTextFilterInput={true}
        />

        {this.state.showForm ? (
          <AttributeForm
            auth={this.props.auth}
            groupAttribute={this.props.selectedGroup}
            bindSubmit={e => (this.formSubmit = e)}
            formData={this.state.form}
            onSubmit={this.submit.bind(this)}
            attributeTypes={this.state.attributeTypes}
          />
        ) : null}
      </div>
    );
  }
}

export default injectIntl(AttributesByGroup);
