import {FormattedMessage} from "react-intl";
import React from "react";
import {Field, FieldArray} from "formik";

export default ({formik}) => {

    return (

        <div className="form-group">
            <label className="control-label">
                <FormattedMessage id="item_mapping.form.barcode.label"
                                  defaultMessage="Barcode"/>
            </label>


            <Field
                className="form-control"
                type='text'
                name="barCode"
            />
        </div>

    )
}