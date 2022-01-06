import React from "react";
import api from "../../../api";
import { Card, CardBody, CardTitle } from "reactstrap";
import { FormattedMessage, injectIntl, defineMessages } from "react-intl";
import ActionButtons from "../../../components/form-elements/action-buttons";
import MXReactTable from '../common/mx-react-table';
import MXForm from "./components/other-income-form";
import CenterCircularProgress from "../../../components/ui-elements/center-circular-progress";
import MXAlerts from "../common/mx-alerts";
import {onClickRow,refresh,addNewItem} from '../common/mx-common-index-exports';
import otherIncomeColumns from "./components/other-income-columns";
import {otherIncomeFilterUrl} from "../common/constants";

const messages = defineMessages({
  updateSuccessMsg: {
    id: "otherIncome.update_success_msg",
    defaultMessage: "Other income updated successfully"
  },
  createdSuccessMsg: {
    id: "otherIncome.create_success_msg",
    defaultMessage: "Other income created successfully"
  }
});

class OtherIncomeIndex extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   loading: false,
    //   list: [],
    //   initialSearch: true,
    //   selected: null,
    //   showForm: false,
    //   filter: props.filter || "",
    //   typeOfIncomes: [],
    //   filtered: props.filtered || [],
    //   shops: [],
    //   page: 0,
    //   alert: {
    //     show: false
    //   }
    // };

    this.state = {
      selectedEntity: null,
      selectedIndex: null,
      showForm: false,
      saving: false,
      form: {}
    };

    this.defaultFilters = [
        {
          id: 'shopId',
          value: null
        },
        {
          id: 'typeOfIncomeId',
          value: null
        },
        {
          id: "startDate",
          value: null
        },
        {
          id: "endDate",
          value: null
        }
    ];

    this.dissmissAlert = this.dissmissAlert.bind(this);
    this.mxReactTableRef = React.createRef();
    this.onClickRow=onClickRow.bind(this);
    this.refresh=refresh.bind(this);
    this.add=addNewItem.bind(this);

    // this.fetchTimeout = false;
    // this.tableState = null;
  }

  // componentDidMount() {}

  // onChangeFilter(value) {
  //   this.setState({ filter: value });
  //   this.onFetchData();
  // }
  //
  // onFilteredChange(filtered) {
  //   this.setState({ filtered });
  // }
  //
  // onFetchData(state) {
  //   if (this.fetchTimeout) clearTimeout(this.fetchTimeout);
  //   state = state || this.tableState;
  //
  //   let Fetch = () => {
  //     this.setState({ loading: true, selected: {} });
  //     this.tableState = state;
  //
  //     let filter = {};
  //     state.filtered.forEach(
  //       f => (filter[f.id] = f.value ? f.value.value : null)
  //     );
  //     filter.filter = this.state.filter;
  //
  //     api
  //       .post(
  //         `other-incomes/other-income/filtered?page=${state.page}&size=${
  //           state.pageSize
  //         }`,
  //         { ...filter }
  //       )
  //       .then(response => {
  //         this.setState({
  //           list: response.data.content,
  //           loading: false,
  //           page: Math.ceil(response.data.totalElements / state.pageSize)
  //         });
  //       });
  //   };
  //
  //   this.fetchTimeout = setTimeout(() => {
  //     Fetch();
  //   }, 0);
  // }

  // onClickRow(row) {
  //   this.setState(state => {
  //     state.selected = row.index === state.selected ? null : row.index;
  //     return state;
  //   });
  // }

  edit() {
    api
      .get(
        `other-incomes/other-income/${this.state.selectedEntity.id}`
      )
      .then(response => {
        this.setState({
          showForm: true,
          form: response.data
        });
      });
  }

  back() {
    this.setState({
      showForm: false
    });
  }

  save(e) {
    this.formSubmit();
  }

  dissmissAlert() {
    this.setState({alertMsg: null, sweetAlertMsg: null});
  }

  submit(data) {
    this.setState({saving: true});

    let result = data.id
        ? api.put("other-incomes/other-income", data)
        : api.post("other-incomes/other-income", data);

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

  // submit(data) {
  //   this.setState({ saving: true });
  //
  //   const requests = [];
  //   let requestData = { ...data };
  //
  //   requests.push(
  //     data.id
  //       ? api.put("other-incomes/other-income", requestData)
  //       : api.post("other-incomes/other-income", requestData)
  //   );
  //
  //   axios
  //     .all(requests)
  //     .then(response => {
  //       this.setState({
  //         saving: false,
  //         form: {},
  //         alert: {
  //           show: true,
  //           message: this.props.intl.formatMessage(
  //             data.id ? messages.updateSuccessMsg : messages.createdSuccessMsg
  //           ),
  //           color: "success"
  //         }
  //       });
  //       this.back();
  //       this.onFetchData();
  //       setTimeout(() => this.dissmissAlert(), 2000);
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         this.setState({ saving: false });
  //         this.props.alertActions.showRequestError(error);
  //       }
  //     });
  // }

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
                  id="otherIncome.title"
                  defaultMessage="Other Income"
                />
              </CardTitle>
            </div>
            <div className="col-9">
              <ActionButtons
                  hideAdd={this.props.auth.isShopManager()}
                  hideSave={this.props.auth.isShopManager()}
                  hideBack={!this.state.showForm}
                  disableSave={!this.state.showForm || this.state.saving}
                  disableEdit={this.state.selectedEntity === null}
                  disableRefresh={this.state.showForm}
                  confirmDelete={true}
                  onClickAdd={this.add}
                  onClickBack={this.back.bind(this)}
                  //onClickDelete={this.back.bind(this)}
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
                columns={otherIncomeColumns}
                onClickRow={this.onClickRow}
                selectedIndex={this.state.selectedIndex}
                filterUrl={otherIncomeFilterUrl}
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

          {/*<OtherIncomeTable*/}
          {/*  show={!this.state.showForm}*/}
          {/*  loading={this.state.loading}*/}
          {/*  list={this.state.list}*/}
          {/*  onClickRow={this.onClickRow.bind(this)}*/}
          {/*  selectedIndex={this.state.selected}*/}
          {/*  initialSearch={this.state.initialSearch}*/}
          {/*  pages={this.state.page}*/}
          {/*  onFetchData={this.onFetchData.bind(this)}*/}
          {/*  onFilteredChange={this.onFilteredChange.bind(this)}*/}
          {/*  filtered={this.state.filtered}*/}
          {/*/>*/}

          {/*{this.state.showForm ? (*/}
          {/*  <OtherIncomeForm*/}
          {/*    bindSubmit={e => (this.formSubmit = e)}*/}
          {/*    formData={this.state.form}*/}
          {/*    onSubmit={this.submit.bind(this)}*/}
          {/*    shops={this.state.shops}*/}
          {/*    typeOfIncomes={this.state.typeOfIncomes}*/}
          {/*    auth={this.props.auth}*/}
          {/*  />*/}
          {/*) : null}*/}
        </CardBody>
      </Card>
    );
  }
}

export default injectIntl(OtherIncomeIndex);
