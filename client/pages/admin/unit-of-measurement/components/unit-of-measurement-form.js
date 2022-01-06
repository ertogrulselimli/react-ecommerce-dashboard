import React from 'react'
import {TabContent, TabPane} from 'reactstrap';
import {injectIntl, defineMessages} from 'react-intl';
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import FormNavLinks from "../../../../components/form-elements/form-nav-links";
import LocalizationFields from '../../../../components/form-elements/localization-fields';
import {localizationFieldValidation, descriptionFieldValidation} from "../../common/mx-formik-common-field-validations";
import { MXTextInput} from "../../common/fields/standard-formik-input-elements";


const navLinks = defineMessages({
    main: {
        id: 'unit_of_measurement.form.link.main_information',
        defaultMessage: 'Əsas məlumatlar'
    },
    localization: {
        id: 'unit_of_measurement.form.link.localization',
        defaultMessage: 'Localization'
    }
});

class UnitOfMeasurementForm extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            navLinks: [
                {
                    tab: '1',
                    title: props.intl.formatMessage(navLinks.main),
                    fields: ['code', 'displayName']
                }
            ]
        };

        this.validation = yup.object().shape({
            displayName: localizationFieldValidation(props.intl),
            description: descriptionFieldValidation(props.intl)
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
                    id: initalData.id,
                    displayName: initalData.displayName || [],
                    description: initalData.description || '',
                }}
                onSubmit={this.props.submit}
                validationSchema={this.validation}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {
                    (props) => {
                        this.props.bindSubmit(props.handleSubmit);
                        return (
                            <Form onSubmit={(e) => {
                                e.preventDefault();
                            }}>
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
                                                    intlMessageId="unit_of_measurement.form.description.label"
                                                    intlDefaultMessage="Description"
                                                    fieldErrorMessage={[props.errors.description]}
                                                    fieldName="description"
                                                />
                                                <div className="row">
                                                    <div className="col-12">
                                                        <LocalizationFields
                                                            error={props.errors.displayName}
                                                            values={props.values.displayName}
                                                            onValueChange={values => {
                                                                props.setFieldValue("displayName", values);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
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

export default injectIntl(UnitOfMeasurementForm);
