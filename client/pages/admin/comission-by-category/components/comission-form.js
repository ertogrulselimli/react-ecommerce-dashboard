import React from 'react'
import {TabContent, TabPane, Nav, NavItem, NavLink, Alert} from 'reactstrap';
import {injectIntl, FormattedMessage, defineMessages} from 'react-intl';
import {Field, Formik, Form} from 'formik';
import * as yup from 'yup'
import validationMessages from '../../../../messages/validation'
import FormNavLinks from '../../../../components/form-elements/form-nav-links'
import DateInput from "../../../../components/form-elements/date-input";
import moment from "moment";
import ComissionFormFieldCategoryTree from './fields/comission-form-field-category';
import MXDynamicSelectInput from "../../common/mx-dynamic-select-input";
import {MXNumberInput, MXTextInput} from "../../common/fields/standard-formik-input-elements";
import {shopFilterUrl} from "../../common/constants";

//import {displayName} from '../../../../helpers'
//import classnames from 'classnames';

const navLinks = defineMessages({
    main: {
        id: 'comission_by_category.form.link.main_information',
        defaultMessage: 'Əsas məlumatlar'
    }
});




class ComissionForm extends React.Component {

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
            categoryId: yup.number().required(props.intl.formatMessage(validationMessages.required)),
            comission: yup
                .number()
                .min(0, props.intl.formatMessage(validationMessages.valueRange))
                .max(100, props.intl.formatMessage(validationMessages.valueRange)),
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
                enableReinitialize={true}
                initialValues={{
                    id: initalData.id,
                    comission: initalData.comission || '',
                    categoryId: initalData.categoryId || null,
                    categoryDescription: initalData.categoryDescription || '',
                    shopDescription: initalData.shopDescription || '',
                    shopId: initalData.shopId || '',
                    from: initalData.from ? moment(initalData.from) : null,
                    to: initalData.to ? moment(initalData.to) : null
                }}
                onSubmit={this.props.submit}
                validationSchema={this.validation}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {
                    props => {
                        this.props.bindSubmit(props.handleSubmit);
                        return (
                            <Form onSubmit={(e)=>{e.preventDefault();}}>
                                <FormNavLinks
                                    active={this.state.activeTab}
                                    links={this.state.navLinks}
                                    onClick={this.toggle.bind(this)}
                                    errors={props.errors}
                                />

                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <ComissionFormFieldCategoryTree
                                                    formik={props}
                                                    categories={this.props.categories}
                                                />

                                                <MXNumberInput
                                                    intlMessageId="comission_by_category.form.comission.label"
                                                    intlDefaultMessage="Comission"
                                                    fieldErrorMessage={[props.errors.comission]}
                                                    fieldName="comission"
                                                />

                                                <DateInput
                                                    label='Date From'
                                                    value={props.values.from}
                                                    onChange={date => {
                                                        props.setFieldValue('from', date)
                                                    }}
                                                />
                                                <DateInput
                                                    label='Date To'
                                                    value={props.values.to}
                                                    onChange={date => {
                                                        props.setFieldValue('to', date)
                                                    }}
                                                />
                                                <MXDynamicSelectInput
                                                    labelClassName="control-label mt-3"
                                                    formik={props}
                                                    intlMessageId="item_mapping.table.shop_description"
                                                    intlDefaultMessage="Shop Description"
                                                    fieldId="shopId"
                                                    fieldDescription="shopDescription"
                                                    filterUrl={shopFilterUrl}
                                                />
                                            </div>
                                        </div>
                                        <button className="hidden" type="submit" style={{display: 'none'}}/>
                                    </TabPane>
                                </TabContent>
                            </Form>
                        )
                    }
                }
            </Formik>
        )
    }
}


export default injectIntl(ComissionForm);
