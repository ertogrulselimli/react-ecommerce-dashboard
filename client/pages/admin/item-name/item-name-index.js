import React from "react";
import api from "../../../api";
import {Card, CardBody, CardTitle, Alert} from "reactstrap";
import {FormattedMessage} from "react-intl";
import ActionButtons from "../../../components/form-elements/action-buttons";
import MXReactTable from "../common/mx-react-table";
import MXForm from "./components/item-name-form";
import {injectIntl, defineMessages} from "react-intl";
import CenterCircularProgress from "../../../components/ui-elements/center-circular-progress";
import {itemNameColumns} from "./components/item-name-table-columns";
import {itemNameFilterUrl} from "../common/constants";
import MXAlerts from "../common/mx-alerts";
import {addNewItem, onClickRow, refresh} from "../common/mx-common-index-exports";

const messages = defineMessages({
    updateSuccessMsg: {
        id: "item_name.update_success_msg",
        defaultMessage: "Item name updated successfully"
    },
    createdSuccessMsg: {
        id: "item_name.create_success_msg",
        defaultMessage: "Item name created successfully"
    },
    deleteSuccessMessage: {
        id: "item_name.delete_success_msg",
        defaultMessage: "Item deleted successfully"
    }
});

class ItemNameIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedEntity: null,
            selectedIndex: null,
            showForm: false,
            saving: false,
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
        this.onClickRow = onClickRow.bind(this);
        this.refresh = refresh.bind(this);
        this.add = addNewItem.bind(this);
    }

    componentDidMount() {
        api
            .get("catalog/category/tree")
            .then(response => this.setState({tree: response.data}));
    }


    edit() {
        api
            .get(`catalog/item-name/${this.state.selectedEntity.id}`)
            .then(response => {
                this.setState({showForm: true, form: response.data});
            });
    }

    back() {
        this.setState({showForm: false});
    }

    save(e) {
        this.formSubmit();
    }

    dissmissAlert() {
        this.setState({alertMsg: null, sweetAlertMsg: null});
    }

    delete() {
        const itemName = this.state.selectedEntity;;
        api.post(`catalog/item-name/delete/${itemName.id}`).then(response => {
            if (response.data.response === "ERROR") {
                this.setState({
                    saving: false,
                    sweetAlertMsg: this.renderDeleteErrorMessage(
                        response.data.errorText,
                        itemName
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
        this.setState({saving: true});
        let result = data.id
            ? api.put("catalog/item-name", data)
            : api.post("catalog/item-name", data);
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

    renderDeleteErrorMessage(errorText, itemName) {
        return (
            <div>
                {errorText}
                <p
                    className="text-primary c-pointer"
                    onClick={e => {
                        this.props.tabActions.openTab("product", {
                            filter: itemName.description
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
                                <FormattedMessage
                                    id="item_name.title"
                                    defaultMessage="Item name"
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

                    <div style={ this.state.showForm === true ? {
                        visibility: "hidden",
                        maxHeight: "0",
                        overflow: 'hidden'
                    } : {}}>
                        <MXReactTable
                            ref={this.mxReactTableRef}
                            columns={itemNameColumns}
                            onClickRow={this.onClickRow}
                            selectedIndex={this.state.selectedIndex}
                            filterUrl={itemNameFilterUrl}
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
                                categories={this.state.tree}
                            />:null}
                    </div>

                </CardBody>
            </Card>
        );
    }
}

export default injectIntl(ItemNameIndex);
