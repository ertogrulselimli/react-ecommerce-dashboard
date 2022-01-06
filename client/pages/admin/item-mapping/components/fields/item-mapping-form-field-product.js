import {FormattedMessage} from "react-intl";
import React from "react";
import ProductSelectInput from "../../../product/components/product-select-input";

export default ({formik}) => {
    return(


        <div className="form-group">
            <label className="control-label">
                <FormattedMessage
                    id="item_mapping.form.product.label"
                    defaultMessage="Product"
                />
            </label>
            <ProductSelectInput
                filter={{
                    categoryId: formik.values.categoryId,
                    itemNameId: formik.values.itemNameId,
                    filter: ''
                }}
                onChange={p => {
                    formik.setFieldValue('productId', p.value);
                    formik.setFieldValue('productDescription', p.label);
                }}
                value={{
                    value: formik.values.productId,
                    label: formik.values.productDescription
                }}
            />
        </div>
    )
}