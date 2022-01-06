import React from "react";
import api from "../../../api";
import { Card, CardBody, CardTitle } from "reactstrap";
import { FormattedMessage, defineMessages, injectIntl } from "react-intl";
import ActionButtons from "../../../components/form-elements/action-buttons";
import MXReactTable from "../common/mx-react-table";
import MXForm from "./components/shop-form";
import CenterCircularProgress from "../../../components/ui-elements/center-circular-progress";
import MXAlerts from "../common/mx-alerts";
import shopColumns from "./components/shop-table-columns";
import {shopFilterUrl} from "../common/constants";
import {onClickRow,refresh,addNewItem} from '../common/mx-common-index-exports';

//import onFetchData from "./../common/on-fetch-data";
//import MXReactTable from "../../../components/react-table/tg-react-table-intl";
//import SweetAlert from "react-bootstrap-sweetalert";


//SHOP SUCCESS MESSAGE
const messages = defineMessages({
  updateSuccessMsg: {
    id: "brands.update_success_msg",
    defaultMessage: "Brand updated successfully"
  },
  createdSuccessMsg: {
    id: "brands.create_success_msg",
    defaultMessage: "Brand created successfully"
  }
});

class ShopIndex extends React.Component {
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

  dissmissAlert() {
    this.setState({ alertMsg: null, sweetAlertMsg: null });
  }

  edit() {
    api
      .get(`shop/shop/${this.state.selectedEntity.id}`)
      .then(response => {
        this.setState({
          showForm: true,
          form: response.data
        });
      });
  }


  back() {
    this.setState({ showForm: false });
  }

  save(e) {
    this.formSubmit();
  }

  submit(data) {
    this.setState({ saving: true });

    let result = data.id
      ? api.put("shop/shop", data)
      : api.post("shop/shop", data);

    result
      .then(response => {
        this.setState({
          saving: false,
          showForm: false,
          alertMsg: this.props.intl.formatMessage(
            data.brandId
              ? messages.updateSuccessMsg
              : messages.createdSuccessMsg
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
                  id="shops.page_title"
                  defaultMessage="Shops"
                />
              </CardTitle>
            </div>
            <div className="col-9">
              <ActionButtons
                hideBack={!this.state.showForm}
                disableSave={!this.state.showForm || this.state.saving}
                disableEdit={this.state.selectedEntity === null}
                disableRefresh={this.state.showForm}
                onClickAdd={this.add}
                onClickBack={this.back.bind(this)}
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
                columns={shopColumns}
                onClickRow={this.onClickRow}
                selectedIndex={this.state.selectedIndex}
                filterUrl={shopFilterUrl}
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

export default injectIntl(ShopIndex);
