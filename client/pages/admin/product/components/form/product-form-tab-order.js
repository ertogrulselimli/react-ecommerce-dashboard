import React from 'react'
import {MXTextInput,MXCheckboxInput,MXNumberInput} from '../../../common/fields/standard-formik-input-elements'


export default props => (

    <div className="row">
        <div className="col-6">
            <div className="row">
                <div className="col-4">
                    <MXNumberInput
                        intlMessageId="product.form.width.label"
                        intlDefaultMessage="Width"
                        fieldName="width"
                    />
                </div>
                <div className="col-4">
                    <MXNumberInput
                        intlMessageId="product.form.height.label"
                        intlDefaultMessage="Height"
                        fieldName="height"
                    />
                </div>
                <div className="col-4">
                    <MXNumberInput
                        intlMessageId="product.form.depth.label"
                        intlDefaultMessage="Depth"
                        fieldName="depth"
                    />
                </div>
            </div>

            {/*      <CommonDropDownTableInput
             formik={props.formik}
             modalHeader="Select Unit Of Measurenemnt"
             fieldId="widthHeightDepthMeasurementId"
             fieldDescription="whdMeasurementDescription"
             filterUrl={unitOfMeasurementFilterUrl}
             columns={unitOfMeasurementTableColumns}
             intlMessageId="product.form.width_height_depth_measurement.label"
             intlDefaultMessage="Width heiht depth measurement"
             />*/}

            <div className="row mt-4">
                <div className="col-6">

                    <MXNumberInput
                        intlMessageId="product.form.volume.label"
                        intlDefaultMessage="Volume"
                        fieldName="volume"
                    />

                </div>
                <div className="col-6">
                    {/*          <CommonDropDownTableInput
                     formik={props.formik}
                     modalHeader="Select Unit Of Measurenemnt"
                     fieldId="volumeMeasurementId"
                     fieldDescription="volumeMeasurementDescription"
                     filterUrl={unitOfMeasurementFilterUrl}
                     columns={unitOfMeasurementTableColumns}
                     intlMessageId="product.form.volume_unit.label"
                     intlDefaultMessage="Volume Unit"
                     />*/}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-6">
                    <MXNumberInput
                        intlMessageId="product.form.weight.label"
                        intlDefaultMessage="Weight"
                        fieldName="weight"
                    />
                </div>

                <div className="col-6">
                    {/*            <CommonDropDownTableInput
                     formik={props.formik}
                     modalHeader="Select Unit Of Measurenemnt"
                     fieldId="weightMeasurementId"
                     fieldDescription="weightMeasurementDescription"
                     filterUrl={unitOfMeasurementFilterUrl}
                     columns={unitOfMeasurementTableColumns}
                     intlMessageId="product.form.weight_measurement.label"
                     intlDefaultMessage="Weight measurement"
                     />*/}
                </div>
            </div>

            <MXNumberInput
                intlMessageId="product.form.min_order_quantity.label"
                intlDefaultMessage="Min order quantity"
                fieldName="minOrderQuantity"
            />

            <MXNumberInput
                intlMessageId="product.form.max_order_quantity.label"
                intlDefaultMessage="Max order quantity"
                fieldName="maxOrderQuantity"
            />

            <MXNumberInput
                intlMessageId="product.form.step_order_quantity.label"
                intlDefaultMessage="Step order quantity"
                fieldName="stepOrderQuantity"
            />

        </div>
    </div>

)