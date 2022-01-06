import React from 'react'
import api from '../../../api'
import {Card, CardBody, CardTitle, Alert} from 'reactstrap';
import axios from 'axios'
import {FormattedMessage} from 'react-intl';
import ActionButtons from '../../../components/form-elements/action-buttons';
import ProductApproveTable from './components/product-approve-table';
import ProductForm from './components/product-form';
import ProductApproveViewModal from './components/product-approve-view-modal';
import {injectIntl, defineMessages} from 'react-intl'
import ProductApproveFilterPanel from './components/product-approve-filter-panel'

import CenterCircularProgress from '../../../components/ui-elements/center-circular-progress'
import {omit} from "../../../helpers";

const messages = defineMessages({
    updateSuccessMsg: {
        id: 'product.update_success_msg',
        defaultMessage: 'Product updated successfully'
    },
    createdSuccessMsg: {
        id: 'product.create_success_msg',
        defaultMessage: 'Product created successfully'
    },
    fillMandatoryAttributesMsg: {
        id: 'product.fill_mandatory_attribute_msg',
        defaultMessage: 'Please fill all mandatory attributes before submit'
    },
    approveButtonTitle: {
        id: 'product_approve.button.approve.title',
        defaultMessage: 'Approve'
    },
    rejectButtonTitle: {
        id: 'product_approve.button.reject.title',
        defaultMessage: 'Reject'
    },
    approveSuccessMsg: {
        id: 'product_approve.approved_success_msg',
        defaultMessage: 'Product approved'
    }
});


class ProductIndex extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            list: [],
            initialSearch: true,
            showForm: false,
            categories: [],
            tableFilter: [{
                id: 'approved',
                value: {value: false, label: "NO"}
            }],
            filter: {
                startCreatedDate: null,
                endCreatedDate: null
            },
            uniteOfMeasurements: [],
            page: 0,
            alert: {
                show: false
            },
            showColumns: {
                "approved": true,
                "approvedBy": false,
                "approvedDate": false,
                "brand": true,
                "broughtOutOfAssortment": true,
                "category": true,
                "createdBy": false,
                "createdDate": false,
                "itemName": true,
                "lastModifiedBy": false,
                "lastModifiedDate": false,
                "model": true
            },
            defaultFilterOptions: {
                categories: [],
                brands: [],
                itemNames: []
            }
        };

        this.fetchTimeout = false;
        this.tableState = null;

    }

    componentDidMount() {
        api.get('catalog/category/tree').then(response => this.setState({categories: response.data}));

        let filterOptionsRequests = [
            api.post(`catalog/categories/filtered/0/100`, {filter: "", active: 'ALL'}),
            api.post(`catalog/item-name/filtered/0/100`, {filter: "", active: 'ALL'}),
            api.post(`brands/brand/filtered/0/100/YES`, "", {headers: {"Content-Type": "text/plain"}}),
        ];

        Promise.all(filterOptionsRequests).then(responses => {
            this.setState({
                defaultFilterOptions: {
                    categories: responses[0].data,
                    brands: responses[2].data,
                    itemNames: responses[1].data,
                }
            })
        });


        api.post(`measure-units/filtered/0/100/YES`,"", {
            headers: {
                'Content-Type': 'text/plain'
            }
        }).then(response => {
            this.setState({uniteOfMeasurements: response.data})
        });

    }


    filterColumn(column, value) {
        this.setState({showColumns: {...this.state.showColumns, [column]: value}})
    }

    onTableFilterChange(tableFilter) {
        this.setState({tableFilter})
    }

    onFilterChange(field, value) {
        this.setState(
            state => ({
                filter: {...state.filter, [field]: value}
            }),
            () => this.onFetchData()
        )
    }


    onFetchData(state) {
        if (this.fetchTimeout) clearTimeout(this.fetchTimeout);
        state = state || this.tableState;

        let Fetch = () => {

            this.setState({loading: true});
            this.tableState = state;

            let requestFilter = {};
            state.filtered.forEach(f => requestFilter[f.id] = f.value ? f.value.value : null);

            requestFilter = {
                ...requestFilter,
                ...this.state.filter
            };
            api.post(`catalog/product/products/filter-for-approve?page=${state.page}&size=${state.pageSize}`, requestFilter).then(response => {
                this.setState({
                    list: response.data.content,
                    loading: false,
                    page: Math.ceil(response.data.totalElements / state.pageSize)
                });
            });

        };

        this.fetchTimeout = setTimeout(() => {
            Fetch()
        }, 0)
    }



    attributesChange(attributes) {
        this.setState({
            attributes: attributes,
            attributesChanged: true
        })
    }

    edit(data) {
        this.setState({loadingProduct: true});

        api.get(`catalog/product/${data.id}`).then(response => {
            this.setState({showForm: true, form: response.data, loadingProduct: false})
        })
    }

    back() {
        this.setState({showForm: false, attributesChanged: false, attributes: []})
    }

    approve() {
        this.formSubmit()
    }

    reject() {
        this.formSubmit()
    }

    dissmissAlert() {
        this.setState({
            alert: {
                show: false,
                color: 'success',
                message: null
            }
        })
    }

    submit(data) {


        this.setState({saving: true});


        //save attributes
        const requests = [];
        let requestData = {...data};
        if (this.state.attributesChanged) {
            //check mandatory fields
            let allMandatoryAttributesFilled = true;
            this.state.attributes.forEach(attribute => {
                if (attribute.productTypeAttr.mandatory && attribute.attributeValue === null) {
                    allMandatoryAttributesFilled = false
                }
            });

            if (!allMandatoryAttributesFilled) {
                this.setState({
                    saving: false,
                    alert: {
                        show: true,
                        message: this.props.intl.formatMessage(messages.fillMandatoryAttributesMsg),
                        color: 'danger'
                    }
                });
                return false;
            }

            requestData.productAttrValueVms = this.state.attributes.map(attribute => {
                if (attribute.crud) {
                    return {
                        crud: attribute.crud,
                        productAttrValueDTO: {
                            attributeValueId: attribute.attributeValue.id,
                            productTypeAttrId: attribute.productTypeAttr.id,
                            productId: attribute.productId,
                            id: attribute.id
                        }
                    };
                }
            }).filter(notUndefined => notUndefined);
        }


        // //filter unchanged media files
        requestData.productMedias = requestData.productMedias.filter(file => file.data.crud && (!file.id || file.data.crud !== 'd')).map(file => file.data);


        requestData.articulesVMS = data.articules.filter(articule => {
            return articule.crud && !(!articule.id && articule.crud === 'd')
        }).map(articule => ({
            articule: omit(articule, ['crud', 'prevCrud']),
            crud: articule.crud
        }));

        requestData.barcodesVMS = data.barcodes.filter(barcode => {
            return barcode.crud && !(!barcode.id && barcode.crud === 'd')
        }).map(barcode => ({
            barcode: omit(barcode, ['crud', 'prevCrud']),
            crud: barcode.crud
        }));

        delete requestData.articules;
        delete requestData.barcodes;


        requests.push(api.post('catalog/products/product/approve', requestData));

        axios.all(requests).then(response => {
            this.setState({
                saving: false,
                form: {},
                alert:
                    {
                        show: true,
                        message: this.props.intl.formatMessage(messages.approveSuccessMsg),
                        color: 'success'
                    }
            });
            this.back();
            this.onFetchData();
            setTimeout(() => this.dissmissAlert(), 2000)
        }).catch(error => {
            if (error.response) {
                this.setState({saving: false});
                this.props.alertActions.showRequestError(error)
            }
        })

    }


    render() {


        return (
            <Card>
                <CardBody>
                    <CardTitle>
                        <FormattedMessage id="products_approve.title" defaultMessage="Approve products"/>
                    </CardTitle>

                    <CenterCircularProgress portal show={this.state.saving} size={60} delay={800}/>

                    <div className="row">
                        <div className="col-9">
                            <ProductApproveFilterPanel
                                hide={this.state.showForm}
                                filter={this.state.filter}
                                columns={this.state.showColumns}
                                onChange={this.onFilterChange.bind(this)}
                                onFilterColumn={this.filterColumn.bind(this)}
                            />
                        </div>
                        <div className="col-3">
                            <ActionButtons
                                onClickRefresh={this.onFetchData.bind(this)}
                            />

                        </div>
                    </div>

                    <Alert
                        color={this.state.alert.color}
                        isOpen={this.state.alert.show}
                        toggle={this.dissmissAlert.bind(this)}>
                        {this.state.alert.message}
                    </Alert>


                    <ProductApproveTable
                        show={true}
                        loading={this.state.loading}
                        list={this.state.list}
                        initialSearch={this.state.initialSearch}
                        pages={this.state.page}
                        showColumns={this.state.showColumns}
                        onFetchData={this.onFetchData.bind(this)}
                        onFilteredChange={this.onTableFilterChange.bind(this)}
                        defaultFilterOptions={this.state.defaultFilterOptions}
                        filtered={this.state.tableFilter}
                        edit={this.edit.bind(this)}
                    />

                    {
                        this.state.showForm ?
                            <ProductApproveViewModal
                                bindSubmit={e => this.formSubmit = e}
                                formData={this.state.form}
                                onSubmit={this.submit.bind(this)}
                                shops={this.state.shops}
                                categories={this.state.categories}
                                uniteOfMeasurements={this.state.uniteOfMeasurements}
                                auth={this.props.auth}
                                onAttributesChange={this.attributesChange.bind(this)}
                                approve={this.approve.bind(this)}
                                close={this.back.bind(this)}
                            /> :
                            null
                    }

                </CardBody>
            </Card>
        )
    }
}


export default injectIntl(ProductIndex)


