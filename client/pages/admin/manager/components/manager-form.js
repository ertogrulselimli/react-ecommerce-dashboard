import React from "react";
import {TabContent, TabPane, Alert} from "reactstrap";
import {injectIntl, FormattedMessage, defineMessages} from "react-intl";
import {Formik, Form, Field} from "formik";
import * as yup from "yup";
import FormNavLinks from "../../../../components/form-elements/form-nav-links";
import LocalizationFields from "../../../../components/form-elements/localization-fields";
//import {localizationFieldValidation, descriptionFieldValidation} from "../../common/mx-formik-common-field-validations";
import MXDynamicSelectInput from "../../common/mx-dynamic-select-input";
import {MXTextInput, MXStaticSelectInput} from "../../common/fields/standard-formik-input-elements";
import {shopFilterUrl} from "../../common/constants";
import Assinger from "../../../../components/form-elements/assigner";
import validationMessages from "../../../../messages/validation";

import FieldsErrorMessages from "../../../../components/validation/FieldsErrorMessages";
//import classnames from "classnames";

const navLinks = defineMessages({
    main: {
        id: "manager.form.link.main_information",
        defaultMessage: "Əsas məlumatlar"
    },
    roles: {
        id: "manager.form.link.roles",
        defaultMessage: "Roles"
    }
});

class ManagerForm extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: "1",
            navLinks: [
                {
                    tab: "1",
                    title: props.intl.formatMessage(navLinks.main),
                    fields: ["email", "langKey", "firstName"]
                },
                {
                    tab: "2",
                    title: props.intl.formatMessage(navLinks.roles),
                    fields: ["roles"]
                }
            ]
        };

        this.validation = yup.object().shape({
            email: yup
                .string()
                .email(props.intl.formatMessage(validationMessages.email))
                .required(props.intl.formatMessage(validationMessages.required)),
            roles: yup.array().min(1),
            langKey: yup
                .string()
                .required(props.intl.formatMessage(validationMessages.required)),
            firstname: yup
                .string()
                .required(props.intl.formatMessage(validationMessages.required))
        });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    render() {
        const initalData = this.props.formData;

        return (
            <Formik
                enableReinitialize={true}
                initialValues={{
                    managerId: initalData.managerId,
                    email: initalData.email || "",
                    firstname: initalData.firstname || "",
                    lastname: initalData.lastname || "",
                    password: initalData.password || "",
                    companyName1: initalData.companyName1 || "",
                    companyName2: initalData.companyName2 || "",
                    companyDepartment: initalData.companyDepartment || "",
                    salutation: initalData.salutation || "",
                    roles: initalData.roles || [],
                    shopCode: initalData.shopCode || "",
                    shopId: initalData.shopId,
                    langKey: initalData.langKey || ""
                }}
                onSubmit={this.props.submit}
                validationSchema={this.validation}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {props => {
                    this.props.bindSubmit(props.handleSubmit);
                    return (
                        <Form onSubmit={props.handleSubmit}>
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
                                            <MXTextInput
                                                intlMessageId="manager.email.label"
                                                intlDefaultMessage="Email"
                                                fieldErrorMessage={[props.errors.email]}
                                                fieldName="email"
                                            />
                                            <MXTextInput
                                                intlMessageId="manager.firstname.label"
                                                intlDefaultMessage="Firstname"
                                                fieldErrorMessage={[props.errors.firstname]}
                                                fieldName="firstname"
                                            />
                                            <MXTextInput
                                                intlMessageId="manager.lastname.label"
                                                intlDefaultMessage="Lastname"
                                                fieldName="lastname"
                                            />
                                            <MXTextInput
                                                intlMessageId="manager.companyName1.label"
                                                intlDefaultMessage="Company name 1"
                                                fieldName="companyName1"
                                            />
                                            <MXTextInput
                                                intlMessageId="manager.companyName2.label"
                                                intlDefaultMessage="Company name 2"
                                                fieldName="companyName2"
                                            />
                                            <MXTextInput
                                                intlMessageId="manager.companyDepartment.label"
                                                intlDefaultMessage="Company department"
                                                fieldName="companyDepartment"
                                            />
                                            <MXTextInput
                                                intlMessageId="manager.salutation.label"
                                                intlDefaultMessage="Salutation"
                                                fieldName="salutation"
                                            />
                                            <MXDynamicSelectInput
                                                formik={props}
                                                intlMessageId="manager.shop.label"
                                                intlDefaultMessage="Shop"
                                                fieldId="shopId"
                                                fieldDescription="shopCode"
                                                filterUrl={shopFilterUrl}
                                            />

                                            <MXStaticSelectInput
                                                intlMessageId="manager.lang_key.label"
                                                intlDefaultMessage="Language"
                                                fieldName="langKey"
                                                options={[
                                                    {value: '', label: ''},
                                                    { value: "az", label: "AZ" },
                                                    { value: "ru", label: "RU" },
                                                    {value: "en", label: "EN"}
                                                ]}
                                                fieldErrorMessage={[props.errors.langKey]}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className="hidden"
                                        type="submit"
                                        style={{display: "none"}}
                                    />
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="row mt-1">
                                        <div className="col-8">
                                            <Alert color="danger" isOpen={!!props.errors.roles}>
                                                {props.errors.roles}
                                            </Alert>
                                        </div>
                                        <div className="col-8">
                                            <Assinger
                                                assignedData={props.values.roles}
                                                availableData={this.props.managerRoles}
                                                primaryKey="roleId"
                                                descriptionKey="description"
                                                valueKey="code"
                                                onValueChange={values =>
                                                    props.setFieldValue("roles", values)
                                                }
                                            />
                                        </div>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </Form>
                    );
                }}
            </Formik>
        );
    }
}

export default injectIntl(ManagerForm);
