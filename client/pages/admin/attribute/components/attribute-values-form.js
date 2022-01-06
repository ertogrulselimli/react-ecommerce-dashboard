import React from 'react'
import FieldsErrorMessages from "../../../../components/validation/FieldsErrorMessages";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Field, Formik} from 'formik';
import * as yup from 'yup'
import LocalizationFields from '../../../../components/form-elements/localization-fields'
import {displayName} from '../../../../helpers'
import AttributeValuesMappingForm from './attribute-values-mapping-form'
import Select from 'react-select';

class AttributeValuesForm extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1'
        };

        this.validation = yup.object().shape({})
    }


    onSubmit(values) {
        let data = {...values};
        if (!values.id) {
            delete data.attributeValueCodeMapping;
            delete data.attributeValueDescMapping
        }

        this.props.onSubmit(values)
    }


    render() {

        const initialData = this.props.formData;

        return (

            <Modal isOpen={true} toggle={this.props.toggle} size="lg">
                <ModalHeader>Attribute Value</ModalHeader>
                <ModalBody>


                    <Formik
                        initialValues={{
                            id: initialData.id || null,
                            active: true,
                            attributeValueCodeMapping: initialData.attributeValueCodeMapping || null,
                            attributeValueDescMapping: initialData.attributeValueDescMapping || null,
                            attributeValueDescription: initialData.attributeValueDescription || '',
                            unitOfMeasurement: initialData.unitOfMeasurement || null,
                            displayName: initialData.displayName || [],
                        }}
                        onSubmit={this.onSubmit.bind(this)}
                        validationSchema={this.validation}
                    >
                        {
                            formik => {

                                this.handleSubmit = formik.handleSubmit;

                                return (

                                    <form>

                                        <div className="form-group">
                                            <label className="control-label">
                                                <label className="control-label">
                                                    <FormattedMessage id="attributes.values.localization"
                                                                      defaultMessage="Display value"/>
                                                </label>
                                            </label>

                                            <LocalizationFields
                                                values={formik.values.displayName}
                                                onValueChange={values => {
                                                    formik.setFieldValue('displayName', values)
                                                }}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label">
                                                <FormattedMessage id="attributes.values.description"
                                                                  defaultMessage="Description"/>
                                            </label>
                                            <Field
                                                component="textarea"
                                                className="form-control"
                                                name="attributeValueDescription"
                                            />

                                            <FieldsErrorMessages
                                                show={formik.errors.attributeValueDescription}
                                                messages={[formik.errors.attributeValueDescription]}
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label className="control-label">
                                                <FormattedMessage id="attributes.values.unit"
                                                                  defaultMessage="Unit"/>
                                            </label>
                                            <Select
                                                isClearable={true}
                                                value={{
                                                    label: formik.values.unitOfMeasurement ? displayName(formik.values.unitOfMeasurement.displayName) : '',
                                                    value: formik.values.unitOfMeasurement
                                                }}
                                                isSearchable={true}
                                                options={this.props.uniteOfMeasurements.map(unit => {
                                                    return {
                                                        label: displayName(unit.displayName),
                                                        value: unit
                                                    }
                                                })}
                                                onChange={option => {
                                                    formik.setFieldValue('unitOfMeasurement', option ? option.value : null)
                                                }}
                                            />
                                        </div>


                                        <AttributeValuesMappingForm
                                            show={formik.values.id}
                                            formik={formik}
                                            values={this.props.attributeValues.filter(a => a.id && a.active)}
                                        />
                                    </form>

                                )
                            }
                        }
                    </Formik>

                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="default" onClick={this.props.onClose}>Cancel</Button>
                    <Button type="button" color="success" onClick={() => this.handleSubmit()}>Change</Button>
                </ModalFooter>
            </Modal>
        )
    }
}


export default injectIntl(AttributeValuesForm);
