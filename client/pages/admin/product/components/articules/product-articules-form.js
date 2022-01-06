import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {injectIntl} from 'react-intl';
import {Formik} from 'formik';
import * as yup from 'yup'

import ProductArticulesFieldCategory from './fields/product-articules-field-category'
import ProductArticulesFieldShop from './fields/product-articules-field-shop'
import ProductArticulesFieldArticuleNumber from './fields/product-articules-field-articule-number'
import ProductArticulesFieldItemName from './fields/product-articules-field-partner-item-name'


class ProductArticulesForm extends React.Component {


    constructor(props) {
        super(props);
        this.validation = yup.object().shape({})
    }


    render() {

        const initalData = this.props.formData;

        return (

            <Modal isOpen={true} toggle={this.props.toggle}>
                <ModalHeader>Articules</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            id: initalData.id || null,
                            articuleNumber: initalData.articuleNumber || "",
                            categoryDescription: initalData.categoryDescription || "",
                            categoryId: initalData.categoryId,
                            partnersItemName: initalData.partnersItemName || "",
                            productId: initalData.productId || null,
                            shopDescription: initalData.shopDescription || "",
                            shopId: initalData.shopId || null,
                            crud: initalData.crud || null,
                        }}
                        onSubmit={this.props.onSubmit}
                        validationSchema={this.validation}
                    >
                        {
                            (subform) => {
                                this.handleSubmit = subform.handleSubmit;

                                return (

                                    <form>

                                        <ProductArticulesFieldCategory formik={subform} categories={this.props.categories}/>
                                        <ProductArticulesFieldShop formik={subform}/>
                                        <ProductArticulesFieldArticuleNumber formik={subform}/>
                                        <ProductArticulesFieldItemName formik={subform}/>


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


export default injectIntl(ProductArticulesForm);
























