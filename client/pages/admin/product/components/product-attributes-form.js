import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Formik} from 'formik';
import * as yup from 'yup'


class ProductAttributeForm extends React.Component {


    constructor(props) {
        super(props);
        this.validation = yup.object().shape({})
    }


    render() {

        const initalData = this.props.formData;

        return (

            <Modal isOpen={true} toggle={this.props.toggle}>
                <ModalHeader>Attribute value</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            id: initalData.id || null,
                            displayName: initalData.displayName || [],
                            productId: this.props.productId || null,
                            productTypeAttr: initalData.productTypeAttr,
                            attributeValue: initalData.attributeValue,
                            unitOfMeasurement: initalData.unitOfMeasurement || null,
                            crud: initalData.crud || null
                        }}
                        onSubmit={this.props.onSubmit}
                        validationSchema={this.validation}
                    >
                        {
                            (subform) => {
                                this.handleSubmit = subform.handleSubmit;

                                return (

                                    <form>

                                        <div className="form-group">
                                            <label className="control-label">
                                                <FormattedMessage
                                                    id="product.attributes.form.select_value.label"
                                                    defaultMessage="Select value"/>
                                            </label>
                                            <select
                                                value={subform.values.attributeValue ? subform.values.attributeValue.id : ''}
                                                className="form-control"
                                                onChange={e => {
                                                    subform.setFieldValue('attributeValue',
                                                        this.props.attributeValues.find(v => v.id === parseInt(e.target.value)));
                                                }}
                                            >
                                                <option value=""/>
                                                {
                                                    this.props.attributeValues.map((value, key) => (
                                                        <option value={value.id}
                                                                key={key}>{value.attributeValueDescMapping}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>


                                    </form>

                                )
                            }
                        }
                    </Formik>


                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="default" onClick={this.props.toggle}>Cancel</Button>
                    <Button type="button" color="success" onClick={() => this.handleSubmit()}>Change</Button>
                </ModalFooter>
            </Modal>
        )
    }
}


export default injectIntl(ProductAttributeForm);
























