import React from 'react'
import api from '../../../api'
import {Card, CardBody, CardTitle, Alert} from 'reactstrap';

import {FormattedMessage} from 'react-intl';
import ActionButtons from '../../../components/form-elements/action-buttons';
import TopSalesTable from './components/top-sales-table';
import TopSalesForm from './components/top-sales-form';
import {injectIntl, defineMessages} from 'react-intl'
import SweetAlert from 'react-bootstrap-sweetalert'
import CenterCircularProgress from '../../../components/ui-elements/center-circular-progress'
import TopSalesFilterPanel from './components/top-sales-filter-panel'

const messages = defineMessages({
    updateSuccessMsg: {
        id: 'top_sales.update_success_msg',
        defaultMessage: 'Top Sale updated successfully'
    },
    createdSuccessMsg: {
        id: 'top_sales.create_success_msg',
        defaultMessage: 'Top Sale created successfully'
    },
    deleteSuccessMessage: {
        id: 'top_sales.delete_success_msg',
        defaultMessage: 'Top Sale deleted successfully'
    }
});


class TopSalesIndex extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            list: [],
            selected: null,
            showForm: false,
            initialSearch: true,
            filter: {
                startDate: null,
                endDate: null,
                shopId: 0,
                categoryId: 0,
            },
            page: 0,
            categories: [],
        };
        this.fetchTimeout = false;
        this.tableState = {
            page: 0,
            pageSize: 10
        };
    }

    componentDidMount() {
        api.get('catalog/category/tree').then(response => this.setState({categories: response.data}))

    }

    onChangeFilter(filter, value) {
        console.log(filter, value);
        this.setState({filter: {...this.state.filter, [filter]: value}}, () => this.getTopSales());
    }


    getTopSales(state) {

        if (this.fetchTimeout) clearTimeout(this.fetchTimeout);
        state = state || this.tableState;

        let Fetch = () => {

            this.setState({loading: true, selected: null});
            this.tableState = state;

            // let filter = {};
            let filter = {
                ...this.state.filter,
                startDate: this.state.filter.startDate ? this.state.filter.startDate.format('YYYY-MM-DD'): null,
                endDate: this.state.filter.endDate ? this.state.filter.endDate.format('YYYY-MM-DD'): null,
            };
            api.post(`top-sales/top-sale/filtered?page=${state.page}&size=${state.pageSize}`, {...filter}).then(response => {
                this.setState({
                    list: response.data.content,
                    loading: false,
                    initialSearch: false,
                    page: Math.ceil(response.data.totalElements / state.pageSize)
                });
            });

        };

        this.fetchTimeout = setTimeout(() => {
            Fetch()
        }, 0)

    }

    onClickRow(row) {
        this.setState(state => {
            state.selected = row.index === state.selected ? null : row.index;
            return state
        })
    }

    edit() {
        let topSale = this.state.list[this.state.selected];
        api.get(`top-sales/top-sale/${topSale.id}`).then(response => {
            this.setState({showForm: true, form: response.data})
        });
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

    delete() {

        // const comission = this.state.list[this.state.selected];
        // api.post(`catalog/item-name/delete/${comission.id}`).then(response => {
        //     if (response.data.response === 'ERROR') {
        //         this.setState({
        //             saving: false,
        //             sweetAlertMsg: this.renderDeleteErrorMessage(response.data.errorText, comission)
        //         });
        //     } else {
        //         this.setState({
        //             alertMsg: this.props.intl.formatMessage(messages.deleteSuccessMessage)
        //         });
        //         setTimeout(() => this.dissmissAlert(), 2000)
        //     }
        // });
    }

    submit(data) {

        this.setState({saving: true});

        let rData = {...data};

        rData.from = data.from ? data.from.format('YYYY-MM-DD') : null;
        rData.to = data.to ? data.to.format('YYYY-MM-DD') : null;

        delete rData.categoryDescription;
        delete rData.shopDescription;

        let result = data.id ? api.put('top-sales/top-sale', rData) : api.post('top-sales/top-sale', rData);

        result.then(response => {
            this.setState({
                saving: false,
                showForm: false,
                alertMsg: this.props.intl.formatMessage(data.id ? messages.updateSuccessMsg : messages.createdSuccessMsg)
            });
            this.getTopSales();

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
                        <FormattedMessage id="top_sales.title" defaultMessage="Top Sales"/>
                    </CardTitle>

                    <CenterCircularProgress portal show={this.state.saving} size={60} delay={800}/>

                    <div className="row">
                        <div className="col-9">
                            <TopSalesFilterPanel
                                hide={this.state.showForm}
                                onChange={this.onChangeFilter.bind(this)}
                                filter={this.state.filter}
                            />
                        </div>
                        <div className="col-3">
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
                                onClickRefresh={this.getTopSales.bind(this)}
                                onClickEdit={this.edit.bind(this)}
                                onClickSave={this.save.bind(this)}
                            />

                        </div>
                    </div>

                    <Alert type="success" isOpen={!!this.state.alertMsg} toggle={this.dissmissAlert.bind(this)}>
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

                    <TopSalesTable
                        show={!this.state.showForm}
                        loading={this.state.loading}
                        list={this.state.list}
                        onClickRow={this.onClickRow.bind(this)}
                        selectedIndex={this.state.selected}
                        pages={this.state.page}
                        initialSearch={this.state.initialSearch}
                        onFetchData={this.getTopSales.bind(this)}

                    />

                    {
                        this.state.showForm ?
                            <TopSalesForm
                                bindSubmit={e => this.formSubmit = e}
                                formData={this.state.form}
                                onSubmit={this.submit.bind(this)}
                                categories={this.state.categories}
                            /> :
                            null
                    }

                </CardBody>
            </Card>
        )
    }
}


export default injectIntl(TopSalesIndex)


