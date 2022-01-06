import React from 'react'
import {FormattedMessage, formattedMessage} from 'react-intl'
import Select from "react-select";
import {Field} from "formik";
import {displayName} from '../../../../helpers'

export default ({formik, show, values}) => {
    if (!show) return null;

    let codeMap = formik.values.attributeValueCodeMapping;

    let value = values.find(value => value.id === codeMap) || null;

    return (
        <div>
            <div className='form-group'>
                <label className="control-label">
                    <formattedMessage
                        id="attribute.values.form.code_mapping.label"
                        defaultMessage="Code mapping"/>
                </label>
                <Select
                    value={
                        value ? {value: value.id, label: displayName(value.displayName)} : null
                    }
                    onChange={attr => {
                        formik.setFieldValue('attributeValueCodeMapping', attr.value);
                        formik.setFieldValue('attributeValueDescMapping', attr.original.attributeValueDescMapping)
                    }}
                    options={values.map(a => ({
                        value: a.id,
                        label: displayName(a.displayName),
                        original: a
                    }))}
                />
            </div>

            <div className='form-group'>
                <label className="control-label">
                    <FormattedMessage
                        id="attribute.values.form.desc_mapping.label"
                        defaultMessage="Description mapping"/>
                </label>
                <Field
                    component='textarea'
                    type="text"
                    disabled={true}
                    className="form-control"
                    name="attributeValueDescMapping"
                />
            </div>
        </div>
    )
}