import React from 'react'
import api from '../../../api'
import {Card, CardBody, CardTitle, Alert} from 'reactstrap';

import {FormattedMessage} from 'react-intl';
import ActionButtons from '../../../components/form-elements/action-buttons';
import ImportTable from './components/import-table';
import ImportForm from './components/import-form';
import {injectIntl, defineMessages} from 'react-intl'
import SweetAlert from 'react-bootstrap-sweetalert'
import CenterCircularProgress from '../../../components/ui-elements/center-circular-progress'
import ImportFilterPanel from './components/import-filter-panel'

const messages = defineMessages({
    createdSuccessMsg: {
        id: 'operation_import.create_success_msg',
        defaultMessage: 'File uploaded successfully'
    }
});


class ImportIndex extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            list: [],
            selected: null,
            showForm: false,
            initialSearch: true,
            filter: {
                shopId: 0,
                processed: '',
            },
            page: 0,
            categories: [],
            shops: []
        };
        this.fetchTimeout = false;
        this.tableState = {
            page: 0,
            pageSize: 10
        };
    }


    onChangeFilter(filter, value) {
        console.log(filter, value);
        this.setState({filter: {...this.state.filter, [filter]: value}}, () => this.getFiles());
    }


    getFiles(state) {

        if (this.fetchTimeout) clearTimeout(this.fetchTimeout);
        state = state || this.tableState;

        let Fetch = () => {

            this.setState({loading: true, selected: null});
            this.tableState = state;

            // let filter = {};
            let filter = {
                ...this.state.filter
            };
            api.post(`impex/upload-files/filtered?page=${state.page}&size=${state.pageSize}`, {...filter}).then(response => {
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

        let rData = {...data};

        let form = new FormData();
        form.append('file', rData.file);

        let result =  api.post('impex/uploaded-files', form, {
            headers: {
                SHOP_ID: rData.shopId,
                TEMPLATE_NAME: rData.templateName,
                'content-type': 'multipart/form-data'
            }
        });

        result.then(response => {
            this.setState({
                saving: false,
                showForm: false,
                alertMsg: this.props.intl.formatMessage(messages.createdSuccessMsg)
            });
            this.getFiles();

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
                        <FormattedMessage id="operation_import.title" defaultMessage="Import files"/>
                    </CardTitle>

                    <CenterCircularProgress portal show={this.state.saving} size={60} delay={800}/>

                    <div className="row">
                        <div className="col-9">
                            <ImportFilterPanel
                                hide={this.state.showForm}
                                onChange={this.onChangeFilter.bind(this)}
                                filter={this.state.filter}
                                shops={this.state.shops}
                            />
                        </div>
                        <div className="col-3">
                            <ActionButtons
                                hideAdd={this.props.auth.isShopManager()}
                                hideSave={this.props.auth.isShopManager()}
                                hideBack={!this.state.showForm}
                                disableSave={!this.state.showForm || this.state.saving}
                                disableRefresh={this.state.showForm}
                                onClickAdd={this.add.bind(this)}
                                onClickBack={this.back.bind(this)}
                                onClickRefresh={this.getFiles.bind(this)}
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

                    <ImportTable
                        show={!this.state.showForm}
                        loading={this.state.loading}
                        list={this.state.list}
                        onClickRow={this.onClickRow.bind(this)}
                        selectedIndex={this.state.selected}
                        pages={this.state.page}
                        initialSearch={this.state.initialSearch}
                        onFetchData={this.getFiles.bind(this)}

                    />

                    {
                        this.state.showForm ?
                            <ImportForm
                                bindSubmit={e => this.formSubmit = e}
                                formData={this.state.form}
                                onSubmit={this.submit.bind(this)}
                                shops={this.state.shops}
                                categories={this.state.categories}
                            /> :
                            null
                    }

                </CardBody>
            </Card>
        )
    }
}


export default injectIntl(ImportIndex)


