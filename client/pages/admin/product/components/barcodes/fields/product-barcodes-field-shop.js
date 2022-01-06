import React from 'react'
import FieldsErrorMessages from "../../../../../../components/validation/FieldsErrorMessages";
import {FormattedMessage} from "react-intl";
import ShopFilterInput from "../../../../shop/components/shop-filter-input";



export default ({formik}) => {

    return(
        <div className="form-group">
            <label className="control-label">
                <FormattedMessage id="product.barcode.form.shop.label"
                                  defaultMessage="Shop"/>
            </label>

            <ShopFilterInput
                value={{
                    label: formik.values.shopDescription,
                    value: formik.values.shopId,
                }}
                onChange={shop => {
                    formik.setFieldValue('shopId', shop ? shop.value : null);
                    formik.setFieldValue('shopDescription', shop ? shop.label : null)
                }}
                menuPortalTarget={false}
            />

            <FieldsErrorMessages
                show={formik.errors.shopId}
                messages={[formik.errors.shopId]}
            />
        </div>
    )
}