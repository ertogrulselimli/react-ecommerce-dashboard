import React from 'react'
import api from '../../../api'
import {Card, CardBody, CardTitle} from 'reactstrap';
import {injectIntl, defineMessages, FormattedMessage} from 'react-intl'
import ActionButtons from '../../../components/form-elements/action-buttons';
import MXReactTable from '../common/mx-react-table';
import MXForm from './components/comission-form';
import CenterCircularProgress from '../../../components/ui-elements/center-circular-progress';
import MXAlerts from "../common/mx-alerts";
import comissionColumns from "./components/comission-columns";
import {commissionByCategoryFilterUrl} from '../common/constants'
import {onClickRow,refresh,addNewItem} from '../common/mx-common-index-exports'

const messages = defineMessages({
    updateSuccessMsg: {
        id: 'comission_by_category.update_success_msg',
        defaultMessage: 'Comission updated successfully'
    },
    createdSuccessMsg: {
        id: 'comission_by_category.create_success_msg',
        defaultMessage: 'Comission created successfully'
    },
    deleteSuccessMessage: {
        id: 'comission_by_category.delete_success_msg',
        defaultMessage: 'Comission deleted successfully'
    }
});


class ComissionIndex extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedEntity: null,
            selectedIndex: null,
            showForm: false,
            saving:false,
            form: {},
            categories: []
        };
        this.defaultFilters = [
            {
                id: 'categoryId',
                value: null
            },
            {
                id: 'endDate',
                value: null
            },
            {
                id: 'shopId',
                value: null
            },
            {
                id: 'startDate',
                value: null
            }

        ]
        this.dissmissAlert = this.dissmissAlert.bind(this);
        this.mxReactTableRef = React.createRef();
        this.onClickRow=onClickRow.bind(this);
        this.refresh=refresh.bind(this);
        this.add=addNewItem.bind(this);

        // this.state = {
        //     loading: false,
        //     list: [],
        //     selected: null,
        //     showForm: false,
        //     initialSearch: true,
        //     filter: {
        //         startDate: null,
        //         endDate: null,
        //         shopId: 0,
        //         categoryId: 0,
        //     },
        //     page: 0,
        //     categories: [],
        //     shops: []
        // };
        // this.fetchTimeout = false;
        // this.tableState = {
        //     page: 0,
        //     pageSize: 10
        // };
    }

    componentDidMount() {
        api.get('catalog/category/tree').then(response => this.setState({categories: response.data}))
    }



    // getComissions(state) {
    //
    //     if (this.fetchTimeout) clearTimeout(this.fetchTimeout);
    //     state = state || this.tableState;
    //
    //     let Fetch = () => {
    //
    //         this.setState({loading: true, selected: null});
    //         this.tableState = state;
    //
    //         // let filter = {};
    //         let filter = {
    //             ...this.state.filter,
    //             startDate: this.state.filter.startDate ? this.state.filter.startDate.format('YYYY-MM-DD'): null,
    //             endDate: this.state.filter.endDate ? this.state.filter.endDate.format('YYYY-MM-DD'): null,
    //         };
    //         api.post(`comission-by-categories/comission-by-category/filtered?page=${state.page}&size=${state.pageSize}`, {...filter}).then(response => {
    //             this.setState({
    //                 list: response.data.content,
    //                 loading: false,
    //                 initialSearch: false,
    //                 page: Math.ceil(response.data.totalElements / state.pageSize)
    //             });
    //         });
    //
    //     };
    //
    //     this.fetchTimeout = setTimeout(() => {
    //         Fetch()
    //     }, 0)
    //
    // }



    edit() {
        api
            .get(`comission-by-categories/comission-by-category/${this.state.selectedEntity.id}`)
            .then(response => {
                this.setState({showForm: true,
                    form: response.data});
            });
    }


    back() {
        this.setState({showForm: false})
    }

    save(e) {
        this.formSubmit()
    }

    dissmissAlert() {
        this.setState({alertMsg: null, sweetAlertMsg: null})
    }

    // delete() {
    //
    //     const comission = this.state.list[this.state.selected];
    //     api.post(`catalog/item-name/delete/${comission.id}`).then(response => {
    //         if (response.data.response === 'ERROR') {
    //             this.setState({
    //                 saving: false,
    //                 sweetAlertMsg: this.renderDeleteErrorMessage(response.data.errorText, comission)
    //             });
    //         } else {
    //             this.setState({
    //                 alertMsg: this.props.intl.formatMessage(messages.deleteSuccessMessage)
    //             });
    //             setTimeout(() => this.dissmissAlert(), 2000)
    //         }
    //     });
    // }

    submit(data) {

        this.setState({saving: true});

        let rData = {...data};

        rData.from = data.from ? data.from.format('YYYY-MM-DD') : null;
        rData.to = data.to ? data.to.format('YYYY-MM-DD') : null;

        delete rData.categoryDescription;
        delete rData.shopDescription;

        let result = data.id ? api.put('comission-by-categories/comission-by-category', rData) :
            api.post('comission-by-categories/comission-by-category', rData);

        result.then(response => {
            this.setState({
                saving: false,
                showForm: false,
                alertMsg: this.props.intl.formatMessage(data.id ? messages.updateSuccessMsg : messages.createdSuccessMsg)
            });
            this.refresh();
            //this.getComissions();

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

                    <CenterCircularProgress portal show={this.state.saving} size={60} delay={800}/>

                    <div className="row">
                        <div className="col-3">
                            <CardTitle>
                                <FormattedMessage id="comission_by_category.title" defaultMessage="Comission By Category"/>
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
                                confirmDelete={true}
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
                            columns={comissionColumns}
                            onClickRow={this.onClickRow}
                            selectedIndex={this.state.selectedIndex}
                            filterUrl={commissionByCategoryFilterUrl}
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
                                categories={this.state.categories}
                            />:null}
                    </div>

                    {/*<ComissionTable*/}
                    {/*    show={!this.state.showForm}*/}
                    {/*    loading={this.state.loading}*/}
                    {/*    list={this.state.list}*/}
                    {/*    onClickRow={this.onClickRow.bind(this)}*/}
                    {/*    selectedIndex={this.state.selected}*/}
                    {/*    pages={this.state.page}*/}
                    {/*    initialSearch={this.state.initialSearch}*/}
                    {/*    onFetchData={this.getComissions.bind(this)}*/}

                    {/*/>*/}

                    {/*{*/}
                    {/*    this.state.showForm ?*/}
                    {/*        <ComissionForm*/}
                    {/*            bindSubmit={e => this.formSubmit = e}*/}
                    {/*            formData={this.state.form}*/}
                    {/*            onSubmit={this.submit.bind(this)}*/}
                    {/*            shops={this.state.shops}*/}
                    {/*            categories={this.state.categories}*/}
                    {/*        /> :*/}
                    {/*        null*/}
                    {/*}*/}

                </CardBody>
            </Card>
        )
    }
}


export default injectIntl(ComissionIndex)


