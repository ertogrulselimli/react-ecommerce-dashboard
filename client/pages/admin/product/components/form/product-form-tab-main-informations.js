import React from "react";
import ProductFormFieldCategoryTree from "./fields/product-form-field-category-tree";
import ProductFormFieldItemType from "./fields/product-form-field-item-type";
import MXModalFormikFieldInput from "../../../common/mx-modal-formik-field-input";
import {
  MXCheckboxInput,
  MXTextInput
} from "../../../common/fields/standard-formik-input-elements";
import MXDynamicSelecInput from "../../../common/mx-dynamic-select-input";
import MXDropDownFieldInput from '../../../common/mx-dropdown-formik-field-input'
import {
  itemNameTableColumns,
  brandTableColumns,
  unitOfMeasurementTableColumns
} from "../../../common/all-table-columns";
import {
  brandFilterUrl,
  itemNameFilterUrl,
  unitOfMeasurementFilterUrl
} from "../../../common/constants";




export default props => {
  console.log("came here");
  return (
    <div className="row">
      <div className="col-6">
        <ProductFormFieldCategoryTree {...props} />



{/*        <MXModalFormikFieldInput
          formik={props.formik}
          modalHeader="Select Item name"
          fieldId="itemNameId"
          fieldDescription="itemNameDescription"
          filterUrl={itemNameFilterUrl}
          filters={[
            {
              id: "categoryId",
              value: {
                value: props.formik.values.categoryId,
                label: props.formik.values.categoryDescription
              }
            }
          ]}
          columns={itemNameTableColumns}
          intl={props.intl}
          intlMessageId="product.form.item-name.itemname"
          intlDefaultMessage="Item name"
          key={props.formik.values.categoryId}
        />*/}

        <ProductFormFieldItemType {...props} />

          <MXDropDownFieldInput
                        onSelectEntity={(row)=>{
                          props.formik.setFieldValue('storageUnitId',row.id);
                          props.formik.setFieldValue('storageUnitDescription',row.description);
                        }}
                        filterUrl={unitOfMeasurementFilterUrl}
                        columns={unitOfMeasurementTableColumns}
                        intlMessageId="product.form.storage-unit.storage-unit"
                        intlDefaultMessage="Storage Unit"
                    />

   {/*     <MXDynamicSelecInput
          formik={props.formik}
          fieldId="storageUnitId"
          fieldDescription="storageUnitDescription"
          filterUrl={unitOfMeasurementFilterUrl}
          intlMessageId="product.form.storage-unit.storage-unit"
          intlDefaultMessage="Storage Unit"
        />*/}

        <MXTextInput
          fieldName="model"
          intlMessageId="product.form.model.label"
          intlDefaultMessage="Model"
        />

   {/*     <MXModalFormikFieldInput
          formik={props.formik}
          modalHeader="Select brand"
          fieldId="brandId"
          fieldDescription="brandDescription"
          filterUrl={brandFilterUrl}
          columns={brandTableColumns}
          intl={props.intl}
          intlMessageId="product.form.brand.brand"
          intlDefaultMessage="Brand"
        />*/}
      </div>
    </div>
  );
};
