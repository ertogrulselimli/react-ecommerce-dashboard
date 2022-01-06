import {FormattedMessage} from "react-intl";
import React from "react";
import {Field} from "formik";

export default ({formik, shops}) => {

    return(
        <div className="form-group">
            <label className="control-label">
                <FormattedMessage id="comission_by_category.form.shop.label"
                                  defaultMessage="Shop"/>
            </label>
            <Field
                component="select"
                name="shopId"
                className="form-control"
                value={formik.values.shopId}
                onChange={e => {
                    let value = parseInt(e.target.value);
                    formik.setFieldValue('shopId', value);
                }}
            >
                <option value=""/>
                {
                    shops.map((shop, key) => (
                        <option value={shop.id} key={key}>{shop.name}</option>
                    ))
                }
            </Field>
        </div>
    )
}