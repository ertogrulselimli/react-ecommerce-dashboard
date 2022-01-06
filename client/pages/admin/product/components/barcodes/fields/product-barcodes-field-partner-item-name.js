import React from 'react';
import {FormattedMessage} from "react-intl";
import {Field} from "formik";


export default props => (

    <div className="form-group">
        <label className="control-label">
            <FormattedMessage id="product.barcode.form.partners_item_name.label"
                              defaultMessage="Partner's item name"/>
        </label>
        <Field
            type="text"
            className="form-control"
            name="partnersItemName"
        />
    </div>
)
