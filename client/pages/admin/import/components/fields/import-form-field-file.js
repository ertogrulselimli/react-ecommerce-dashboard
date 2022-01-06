import React from 'react'
import {FormattedMessage} from "react-intl";



export default ({formik}) => {

    return(
        <div className="form-group">
            <label className="control-label">
                <FormattedMessage id="import_operation.form.file.label"
                                  defaultMessage="File"/>
            </label>
            <input
                type="file"
                className="form-control-file"
                onChange={e => {
                    formik.setFieldValue('file',e.target.files[0])
                }}
            />

        </div>
    )
}
