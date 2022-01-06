import React from 'react'
import {TabContent, TabPane, Nav, NavItem, NavLink, Alert} from 'reactstrap';
import classnames from 'classnames';
import {injectIntl, FormattedMessage, defineMessages} from 'react-intl';
import {Field, Formik} from 'formik';
import * as yup from 'yup'
import validationMessages from '../../../../messages/validation'
import FormNavLinks from '../../../../components/form-elements/form-nav-links'
import {displayName} from '../../../../helpers'
import DateInput from "../../../../components/form-elements/date-input";
import moment from "moment";

const navLinks = defineMessages({
    main: {
        id: 'comission_by_category.form.link.main_information',
        defaultMessage: 'Əsas məlumatlar'
    }
});


import TopSalesFormFieldCategoryTree from './fields/top-sales-form-field-category'
import TopSalesFormFieldProduct from './fields/top-sales-form-field-product'


class TopSalesForm extends React.Component {


    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            navLinks: [
                {
                    tab: '1',
                    title: props.intl.formatMessage(navLinks.main),
                    fields: ['categoryId']
                }
            ]
        };

        this.validation = yup.object().shape({
            categoryId: yup.number().required(props.intl.formatMessage(validationMessages.required))
        })
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    submit(values) {
        this.props.onSubmit(values)
    }


    render() {

        const initalData = this.props.formData;

        console.log(initalData);
        return (


            <Formik
                initialValues={{
                    id: initalData.id,
                    categoryId: initalData.categoryId || null,
                    categoryDescription: initalData.categoryDescription || '',
                    topSalesMetric: initalData.topSalesMetric || '',
                    productId: initalData.productId || '',
                    productDescription: initalData.product ? displayName(initalData.product.itemNameDisplayName) + " " + initalData.product.model : null,
                    from: initalData.from ? moment(initalData.from) : null,
                    to: initalData.to ? moment(initalData.to) : null
                }}
                onSubmit={this.submit.bind(this)}
                validationSchema={this.validation}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {
                    formik => {
                        this.props.bindSubmit(formik.handleSubmit);

                        return (
                            <form onSubmit={formik.handleSubmit}>
                                <FormNavLinks
                                    active={this.state.activeTab}
                                    links={this.state.navLinks}
                                    onClick={this.toggle.bind(this)}
                                    errors={formik.errors}
                                />

                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <div className="row mt-3">
                                            <div className="col-6">

                                                <TopSalesFormFieldCategoryTree
                                                    formik={formik}
                                                    categories={this.props.categories}
                                                />

                                                <TopSalesFormFieldProduct
                                                    formik={formik}
                                                />

                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="top_sales.form.metric.label"
                                                                          defaultMessage="Top Sale Metric"/>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="topSalesMetric"
                                                    />
                                                </div>


                                                <DateInput
                                                    label='Date From'
                                                    value={formik.values.from}
                                                    onChange={date => {
                                                        formik.setFieldValue('from', date)
                                                    }}
                                                />

                                                <DateInput
                                                    label='Date To'
                                                    value={formik.values.to}
                                                    onChange={date => {
                                                        formik.setFieldValue('to', date)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <button className="hidden" type="submit" style={{display: 'none'}}/>
                                    </TabPane>
                                </TabContent>
                            </form>
                        )
                    }
                }
            </Formik>
        )
    }
}


export default injectIntl(TopSalesForm);
