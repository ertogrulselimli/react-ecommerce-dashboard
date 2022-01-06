import {FormattedMessage} from "react-intl";
import React from "react";
import {Field, FieldArray} from "formik";

export default ({formik}) => {

    return (

        <div className="form-group">
            <label className="control-label">
                <FormattedMessage id="product.form.barcode.label"
                                  defaultMessage="Barcode"/>
            </label>

            <FieldArray
                name="barCode"
                render={arrayHelpers => (
                    <div>
                        {
                            formik.values.barCode.map((barCode, index) => (
                                <div className="input-group mb-1" key={index}>

                                    <Field
                                        className="form-control"
                                        name={`barCode.${index}`}/>
                                    <div
                                        className="input-group-append"
                                        onClick={() => {
                                            if (formik.values.barCode.length - 1 === index) {
                                                arrayHelpers.push('')
                                            } else {
                                                arrayHelpers.remove(index)
                                            }
                                        }}
                                    >
                                        <span className="input-group-text">
                                              {
                                                  formik.values.barCode.length - 1 === index ?
                                                      <i className='fa fa-plus'/> :
                                                      <i className='fa fa-minus'/>
                                              }
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}
            />
        </div>

    )
}