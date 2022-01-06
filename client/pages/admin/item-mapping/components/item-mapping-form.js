import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {injectIntl} from 'react-intl';
import {Formik} from 'formik';
import * as yup from 'yup'
import {FormattedMessage} from "react-intl";

import ItemMappingFormFieldCategoryTree from './fields/item-mapping-field-category-tree'
import ItemMappingFormFieldBarcode from './fields/item-mapping-form-field-barcode'
import ItemMappingFormArticuleNumber from './fields/item-mapping-form-field-articule-number'
import ItemMappingFormProduct from './fields/item-mapping-form-field-product'

import {itemNameFilterSelectUrl,shopFilterSelectUrl,productFilterSelectUrl} from '../../common/constants'
import CommonSelectFormikInput   from '../../common/mx-dynamic-select-input'

class ItemMappingForm extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1'
        };

        this.validation = yup.object().shape({})
    }


    onSubmit(values) {
        let data = {...values};
        delete data.categoryDescription;
        delete data.itemNameDescription;
        delete data.shopDescription;
        this.props.onSubmit(data)
    }


    render() {

        const initialData = this.props.formData;

        return (

            <Modal isOpen={true} toggle={this.props.toggle}>
                <ModalHeader>Item mapping</ModalHeader>
                <ModalBody>


                    <Formik
                        initialValues={{
                            articulNumber: initialData.articulNumber || '',
                            barCode: initialData.barCode || '',
                            categoryId: initialData.categoryId || null,
                            itemNameId: initialData.itemNameId || null,
                            productId: initialData.productId || '',
                            categoryDescription: initialData.categoryDescription || '',
                            itemNameDescription: initialData.itemNameDescription || '',
                            shopId: initialData.shopId || null,
                            shopDescription: initialData.shopDescription || '',
                        }}
                        onSubmit={this.onSubmit.bind(this)}
                        validationSchema={this.validation}
                    >
                        {
                            formik => {

                                this.handleSubmit = formik.handleSubmit;

                                return (

                                    <form>
                                        <ItemMappingFormFieldCategoryTree
                                            formik={formik}
                                            categories={this.props.categories}/>

                                        {/*<ItemMappingFormFieldItemName formik={formik}/>*/}

                                        <div className="form-group">
                                            <label className="control-label">
                                                <FormattedMessage
                                                    id="item_mapping.form.itemName.label"
                                                    defaultMessage="Item name"
                                                />
                                            </label>
                                            <CommonSelectFormikInput formik={formik}
                                                                     filterUrl={itemNameFilterSelectUrl}
                                                                     fieldId="itemNameId"
                                                                     fieldDescription="itemNameDescription"
                                                                     filters={{categoryId: formik.values.categoryId}}
                                                                     isDisabled={!formik.values.categoryId}
                                                                     defaultOptions={!!formik.values.categoryId}
                                                                     key={formik.values.categoryId}
                                                                     />
                                        </div>


                                       {/* <ItemMappingFormProduct formik={formik}/>*/}
                                        <div className="form-group">
                                            <label className="control-label">
                                                <FormattedMessage
                                                    id="item_mapping.form.product.label"
                                                    defaultMessage="Product"
                                                />
                                            </label>
                                       <CommonSelectFormikInput
                                       formik={formik}
                                       filterUrl={productFilterSelectUrl}
                                       fieldId="productId"
                                       fieldDescription="productDescription"
                                       filters={{categoryId: formik.values.categoryId
                                           ,itemNameId:formik.values.itemNameId}}
                                       isDisabled={!formik.values.categoryId && !formik.values.itemNameId}
                                       defaultOptions={!!formik.values.itemNameId}
                                       key={formik.values.categoryId+formik.values.itemNameId}
                                       />
                                        </div>

                                        <ItemMappingFormFieldBarcode formik={formik}/>

                                 {/*       <ItemMappingFormFieldShop
                                            shops={this.props.shops}
                                            formik={formik}
                                            auth={this.props.auth}/>*/}
                                        <div className="form-group">
                                            <label className="control-label">
                                                <FormattedMessage
                                                    id="item_mapping.form.shop.label"
                                                    defaultMessage="Shop"
                                                />
                                            </label>
                                            <CommonSelectFormikInput formik={formik}
                                                                     filterUrl={shopFilterSelectUrl}
                                                                     fieldId="shopId"
                                                                     fieldDescription="shopDescription"
                                                                     />

                                        </div>

                                        <ItemMappingFormArticuleNumber formik={formik}/>
                                    </form>

                                )
                            }
                        }
                    </Formik>

                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="default" onClick={this.props.onClose}>Cancel</Button>
                    <Button type="button" color="success" onClick={() => this.handleSubmit()}>Submit</Button>
                </ModalFooter>
            </Modal>
        )
    }
}


export default injectIntl(ItemMappingForm);
