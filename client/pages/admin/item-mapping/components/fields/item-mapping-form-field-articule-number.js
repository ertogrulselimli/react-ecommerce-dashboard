import React from 'react'
import {FormattedMessage} from "react-intl";
import {Field} from "formik";


export default () => {

    return (

        <div className="form-group">
            <label className="control-label">
                <FormattedMessage id="product.form.articule_number.label"
                                  defaultMessage="Articule Number"/>
            </label>
            <Field
                type="text"
                className="form-control"
                name="articulNumber"
            />
        </div>
    )
}