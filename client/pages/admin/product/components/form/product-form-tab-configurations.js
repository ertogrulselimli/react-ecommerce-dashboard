import React from 'react'
import FieldsErrorMessages from "../../../../../components/validation/FieldsErrorMessages";
import classnames from 'classnames';
import {FormattedMessage} from 'react-intl';
import {Field} from 'formik';
import CategorySelectInput from '../../../catalog/components/category-select-input'
import {displayName} from '../../../../../helpers'

export default ({formik}) => (

    <div className="row">
        <div className="col-6">
            <div className="form-check">
                <Field
                    type="checkbox"
                    className="form-check-input"
                    name="installationRequired"
                    id="installationRequired"
                    checked={formik.values.installationRequired}
                />
                <label className="form-check-label" htmlFor="installationRequired">
                    <FormattedMessage id="product_type.form.installation_required.label"
                                      defaultMessage="Installation required"/>
                </label>
            </div>
            <div className="form-check">
                <Field
                    type="checkbox"
                    className="form-check-input"
                    name="showInTopSales"
                    id="showInTopSales"
                    checked={formik.values.showInTopSales}
                />
                <label className="form-check-label" htmlFor="showInTopSales">
                    <FormattedMessage id="product_type.form.show_in_top_sales.label"
                                      defaultMessage="Show in top sales"/>
                </label>

            </div>

            <div className="form-check">
                <Field
                    type="checkbox"
                    className="form-check-input"
                    name="hasWarranyPeriod"
                    id="hasWarrantyPeriod"
                    checked={formik.values.hasWarranyPeriod}
                />

                <label className="form-check-label" htmlFor="hasWarrantyPeriod">
                    <FormattedMessage id="product.form.has_warranty_period.label"
                                      defaultMessage="Has warranty period"/>
                </label>

            </div>

            <div
                className={classnames(['row', {'d-none': !formik.values.hasWarranyPeriod}])}>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label className="control-label">
                            <FormattedMessage
                                id="product.form.warranty_period.label"
                                defaultMessage="Warranty period"/>
                        </label>
                        <Field
                            type="number"
                            className="form-control"
                            name="warrantyPeriod"
                        />

                    </div>

                </div>

                <div className="col-lg-6">
                    <div className="form-group">
                        <label className="control-label">
                            <FormattedMessage
                                id="product.form.warranty_period_term.label"
                                defaultMessage="Warranty period term"/>
                        </label>
                        <Field
                            component="select"
                            name="warrantyPeriodTerm"
                            className="form-control">
                            <option value=""/>
                            <option value="MONTH">MONTH</option>
                            <option value="YEAR">YEAR</option>
                        </Field>
                    </div>
                </div>
            </div>
        </div>
    </div>

)




