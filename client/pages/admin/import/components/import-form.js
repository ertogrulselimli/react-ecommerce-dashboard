import React from 'react'
import {TabContent, TabPane} from 'reactstrap';
import {injectIntl, FormattedMessage, defineMessages} from 'react-intl';
import {Field, Formik} from 'formik';
import * as yup from 'yup'
import validationMessages from '../../../../messages/validation'
import FormNavLinks from '../../../../components/form-elements/form-nav-links'

const navLinks = defineMessages({
    main: {
        id: 'import_operation.form.link.main_information',
        defaultMessage: 'Əsas məlumatlar'
    }
});


import ImportFormFieldShop from './fields/import-form-field-shop'
import ImportFormFieldFile from "./fields/import-form-field-file";


class ImportForm extends React.Component {


    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            navLinks: [
                {
                    tab: '1',
                    title: props.intl.formatMessage(navLinks.main),
                    fields: ['shopId', 'templateName']
                }
            ]
        };

        this.validation = yup.object().shape({
            shopId: yup.number().required(props.intl.formatMessage(validationMessages.required))
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

        return (


            <Formik
                initialValues={{
                    id: initalData.id,
                    file: initalData.file || '',
                    templateName: initalData.categoryDescription || '',
                    shopId: initalData.shopId || null
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


                                                <ImportFormFieldShop
                                                    formik={formik}
                                                />

                                                <ImportFormFieldFile
                                                    formik={formik}
                                                />

                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="import_operation.form.template_name.label"
                                                                          defaultMessage="Template Name"/>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="templateName"
                                                    />
                                                </div>
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


export default injectIntl(ImportForm);
