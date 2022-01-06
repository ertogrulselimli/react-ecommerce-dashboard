import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {injectIntl} from 'react-intl';
import {Formik} from 'formik';
import * as yup from 'yup'

import ProductBarcodesFieldCategory from './fields/product-barcodes-field-category'
import ProductBarcodesFieldShop from './fields/product-barcodes-field-shop'
import ProductBarcodesFieldBarcode from './fields/product-barcodes-field-barcode'
import ProductBarcodesFieldItemName from './fields/product-barcodes-field-partner-item-name'


class ProductBarcodeForm extends React.Component {


    constructor(props) {
        super(props);
        this.validation = yup.object().shape({})
    }


    render() {

        const initalData = this.props.formData;

        return (

            <Modal isOpen={true} toggle={this.props.toggle}>
                <ModalHeader>Barcode</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            id: initalData.id || null,
                            barcode: initalData.barcode || "",
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

                                        <ProductBarcodesFieldCategory formik={subform} categories={this.props.categories}/>
                                        <ProductBarcodesFieldShop formik={subform}/>
                                        <ProductBarcodesFieldBarcode formik={subform}/>
                                        <ProductBarcodesFieldItemName formik={subform}/>


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


export default injectIntl(ProductBarcodeForm);
























