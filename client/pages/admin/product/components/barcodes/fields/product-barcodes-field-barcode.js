import React from 'react';
import {FormattedMessage} from "react-intl";
import {Field} from "formik";


export default props => (

    <div className="form-group">
        <label className="control-label">
            <FormattedMessage id="product.articules.form.barcode.label"
                              defaultMessage="Barcode"/>
        </label>
        <Field
            type="text"
            className="form-control"
            name="barcode"
        />
    </div>
)
