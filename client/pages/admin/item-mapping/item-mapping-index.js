import React from "react";
import api from "../../../api";
import {Card, CardBody, CardTitle, Alert} from "reactstrap";

import {FormattedMessage} from "react-intl";
import ActionButtons from "../../../components/form-elements/action-buttons";
import ItemMappingTable from "./components/item-mapping-table";
import {injectIntl, defineMessages} from "react-intl";
import CenterCircularProgress from "../../../components/ui-elements/center-circular-progress";
import ItemMappingTableFilterPanel from "./components/item-mapping-table-filter-panel";
import ItemMappingForm from "./components/item-mapping-form";
import MXAlerts from   '../common/mx-alerts'
import onFetchData from '../common/on-fetch-data'
import MXReactTable from '../../../components/react-table/tg-react-table-intl'
import itemMappingTableColumns from './components/item-mapping-table-columns'

const messages = defineMessages({
    createdSuccessMsg: {
        id: "item_mapping.create_success_msg",
        defaultMessage: "Item mapping created successfully"
    },
    deleteSuccessMessage: {
        id: "item_mapping.delete_success_msg",
        defaultMessage: "Item mapping deleted mapping successfully"
    }
});

class ItemMappingIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            list: [],
            shops: [],
            categories: [],
            initialSearch: true,/*
            filter: {
                productId: null,
                itemNameId: null,
                categoryId: null
            },*/
            filtered: [
                {
                    id: "active",
                    value: {value: "YES", label: "Yes"}
                }
            ],
            page: 0,
            showForm: false,
            formData: {},
            selected: null,
            sweetAlertMsg:null,
            alertMsg:null,

        };
        this.filterUrl = `item-mappings/item-mapping/filtered`
        this.onFetchData = onFetchData.bind(this);
        this.dissmissAlert=this.dissmissAlert.bind(this);
        this.fetchTimeout = false;
    }

    componentDidMount() {
/*        if (this.props.auth.isShopOwner()) {
            api.get("shop/shops/all").then(response => {
                this.setState({shops: response.data});
            });
        }*/

        api
            .get("catalog/category/tree")
            .then(response => this.setState({categories: response.data}));
    }




    dissmissAlert() {
        this.setState({alertMsg: null, sweetAlertMsg: null});
    }


    edit() {
        this.setState({
            showForm: true,
            form: this.state.list[this.state.selected]
        });
    }


    closeForm() {
        this.setState({showForm: false});
    }


    copy(data) {
        this.setState({
            showForm: true,
            formData: this.state.list[this.state.selected]
        })
    }

    add() {
        this.setState({
            showForm: true,
            formData: {}
        })
    }

    onClickRow(row) {
        this.setState(state => {
            state.selected = row.index === state.selected ? null : row.index;
            return state;
        });
    }

    delete() {
        const item = this.state.list[this.state.selected];
        api.post(`item-mappings/item-mapping/delete/${item.id}`).then(response => {
            this.setState({
                alertMsg: this.props.intl.formatMessage(messages.deleteSuccessMessage)
            });
            setTimeout(() => this.dissmissAlert(), 2000);
        });
    }

    submit(data) {
        this.setState({saving: true});

        api
            .post("item-mappings/item-mapping", data)
            .then(response => {
                this.setState({
                    saving: false,
                    showForm: false,
                    alertMsg: this.props.intl.formatMessage(messages.createdSuccessMsg)
                });
                this.onFetchData();

                setTimeout(() => this.dissmissAlert(), 2000);
            })
            .catch(error => {
                //TODO Check data message exists
                this.setState({
                    saving: false,
                    sweetAlertMsg: error.response.data.message
                });
                console.log(error.response.data.message);
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
                   {/*     <div className="col-8">
                            <ItemMappingTableFilterPanel
                                onChange={this.onChangeFilter.bind(this)}
                                filter={this.state.filter}
                            />
                        </div>*/}
                        <div className="col-3">
                        <CardTitle>

                            <FormattedMessage
                                id="item_mapping.title"
                                defaultMessage="Item Mapping"
                            />
                        </CardTitle>
                        </div>
                        <div className="col-9">
                            <ActionButtons
                                confirmDelete={true}
                                disableDelete={!this.state.selected}
                                disableCopy={!this.state.selected}
                                onClickDelete={this.delete.bind(this)}
                                onClickAdd={this.add.bind(this)}
                                onClickRefresh={this.onFetchData.bind(this)}
                                onClickCopy={this.copy.bind(this)}
                                addButtons={[
                                    {
                                        name: "Copy",
                                        type: "success",
                                        title: "Copy",
                                        icon: "fa fa-copy"
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
            {/*        <ItemMappingTable
                        show={true}
                        loading={this.state.loading}
                        list={this.state.list}
                        pages={this.state.total}
                        onClickRow={this.onClickRow.bind(this)}
                        selectedIndex={this.state.selected}
                        onFetchData={this.onFetchData.bind(this)}
                        initialSearch={this.state.initialSearch}
                    />*/}
                    <MXReactTable
                        columns={itemMappingTableColumns}
                        show={!this.state.showForm}
                        loading={this.state.loading}
                        list={this.state.list}
                        onClickRow={this.onClickRow.bind(this)}
                        selectedIndex={this.state.selected}
                        filtered={this.state.filtered}
                        initialSearch={this.state.initialSearch}
                        onFetchData={this.onFetchData}
                        pages={this.state.page}
                        showTextFilterInput={true}
                    />

                    {this.state.showForm ? (
                        <ItemMappingForm
                            formData={this.state.formData}
                            auth={this.props.auth}
                            shops={this.state.shops}
                            categories={this.state.categories}
                            onClose={this.closeForm.bind(this)}
                            onSubmit={this.submit.bind(this)}
                        />
                    ) : null}
                </CardBody>
            </Card>
        );
    }
}

export default injectIntl(ItemMappingIndex);
