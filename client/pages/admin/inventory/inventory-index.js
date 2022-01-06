import React from 'react'
import api from '../../../api'
import {Card, CardBody, CardTitle, Alert} from 'reactstrap';
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl';
import ActionButtons from '../../../components/form-elements/action-buttons';
import InventoryTable from './components/inventory-table';
import InventoryForm from './components/inventory-form';
import {injectIntl, defineMessages} from 'react-intl'
import SweetAlert from 'react-bootstrap-sweetalert'
import FilterInput from '../../../components/form-elements/filter-input'
import CenterCircularProgress from '../../../components/ui-elements/center-circular-progress'

const messages = defineMessages({
    updateSuccessMsg: {
        id: 'inventory.update_success_msg',
        defaultMessage: 'inventory updated successfully'
    },
    createdSuccessMsg: {
        id: 'inventory.create_success_msg',
        defaultMessage: 'Inventory created successfully'
    }
});


class InventoryIndex extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            list: [],
            selected: null,
            showForm: false,
            filter: '',
            shops: [],
            selectedShopCode: this.props.auth.isShopOwner() ? '' : this.props.auth.shopCode
        };


    }

    componentDidMount() {

        if (this.props.auth.isShopOwner()) {
            api.get('shop/all').then(response => {
                this.setState({shops: response.data})
            })
        }else{
            this.getInventory(this.state.selectedShopCode)
        }
    }

    onShopChange(e) {
        const value = e.target.value;
        this.setState({selectedShopCode: value});
        this.getInventory(value)
    }

    getInventory(shopCode) {
        this.setState({loading: true});

        api.get(`inventory/warehouse/${shopCode}/0/100`).then(response => {
            this.setState({list: response.data, loading: false})
        });
    }

    onClickRow(row) {
        this.setState(state => {
            state.selected = row.index === state.selected ? null : row.index;
            return state
        })
    }

    edit() {
        this.setState({showForm: true, form: this.state.list[this.state.selected]})
    }

    add() {
        this.setState({selected: null, showForm: true, form: {}})
    }

    back() {
        this.setState({showForm: false})
    }

    save() {
        this.formSubmit()
    }

    dissmissAlert() {
        this.setState({alertMsg: null, sweetAlertMsg: null})
    }

    submit(data) {

        this.setState({saving: true});

        let result = data.warehouseId ? api.put('inventory/warehouse', data) : api.post('inventory/warehouse', data);

        result.then(response => {
            this.setState({
                saving: false,
                showForm: false,
                alertMsg: this.props.intl.formatMessage(data.warehouseId ? messages.updateSuccessMsg : messages.createdSuccessMsg)
            });
            this.getInventory(this.state.selectedShopCode);

            setTimeout(() => this.dissmissAlert(), 2000)
        }).catch(error => {
            //TODO Check data message exists
            this.setState({saving: false, sweetAlertMsg: error.response.data.message});
        })
    }


    render() {


        return (
            <Card>
                <CardBody>
                    <CardTitle>
                        <FormattedMessage id="inventory.title" defaultMessage="Inventory"/>
                    </CardTitle>

                    <CenterCircularProgress portal show={this.state.saving} size={60} delay={800}/>

                    <div className="row">
                        <div className="col-3">
                            <div className="form-group"
                                 style={{display: !this.props.auth.isShopOwner() || this.state.showForm ? 'none' : 'block'}}>
                                <label className="control-label">
                                    <FormattedMessage id="inventory.index.filter_shop.label"
                                                      defaultMessage="Select shop"/>
                                </label>
                                <select
                                    name="shopCode"
                                    className="form-control"
                                    onChange={this.onShopChange.bind(this)}
                                    value={this.state.selectedShopCode}
                                >
                                    <option value=""/>
                                    {
                                        this.state.shops.map((shop, key) => (
                                            <option value={shop.code} key={key}>{shop.name}</option>
                                        ))
                                    }
                                </select>

                            </div>
                        </div>
                        <div className="col-9">
                            <ActionButtons
                                hideBack={!this.state.showForm}
                                disableSave={!this.state.showForm || this.state.saving}
                                disableEdit={this.state.selected === null}
                                disableRefresh={this.state.showForm}
                                onClickAdd={this.add.bind(this)}
                                onClickBack={this.back.bind(this)}
                                onClickDelete={this.back.bind(this)}
                                onClickRefresh={this.getInventory.bind(this, this.state.selectedShopCode)}
                                onClickEdit={this.edit.bind(this)}
                                onClickSave={this.save.bind(this)}
                            />

                        </div>
                    </div>

                    <Alert type="success" isOpen={!!this.state.alertMsg} toggle={this.dissmissAlert.bind(this)}>
                        { this.state.alertMsg }
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

                    <InventoryTable
                        show={!this.state.showForm}
                        loading={this.state.loading}
                        list={this.state.list}
                        onClickRow={this.onClickRow.bind(this)}
                        selectedIndex={this.state.selected}
                        pages={this.state.total}
                    />

                    {
                        this.state.showForm ?
                            <InventoryForm
                                bindSubmit={e => this.formSubmit = e}
                                formData={this.state.form}
                                onSubmit={this.submit.bind(this)}
                                shops={this.state.shops}
                                auth={this.props.auth}

                            /> :
                            null
                    }

                </CardBody>
            </Card>
        )
    }
}


function mapStoreToProps(state) {
    return {
        auth: state.auth
    }
}


InventoryIndex = connect(mapStoreToProps, () => ({}))(InventoryIndex);


export default injectIntl(InventoryIndex)