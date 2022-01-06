import React from "react";
import {
  MXStaticSelectInput,
  MXTextInput,
  MXNumberInput,
  MXCheckboxInput
} from "../../../common/fields/standard-formik-input-elements";

export default ({ formik }) => {
  return (
    <div className="row mt-3">
      <div className="col-6">
        <MXNumberInput
          intlMessageId="shop.form.comission.label"
          intlDefaultMessage="Comission"
          fieldErrorMessage={[formik.errors.comission]}
          fieldName="comission"
        />
        <MXTextInput
          intlMessageId="shop.form.description.label"
          intlDefaultMessage="Description"
          fieldErrorMessage={[formik.errors.description]}
          fieldName="description"
        />
        <MXCheckboxInput
          fieldName="displayGoodsOnSeperateCard"
          id="displayGoodsOnSeperateCard"
          checked={formik.values.displayGoodsOnSeperateCard}
          intlMessageId="shop.form.displayGoodsOnSeperateCard.label"
          intlDefaultMessage="Display Goods on Seperate Card"
        />
        <MXStaticSelectInput
          fieldName="type"
          intlMessageId="shop.form.partner_type.label"
          intlDefaultMessage="Partner Type"
          options={[
            { value: "SELLER", label: "Seller" },
            { value: "CUSTOMER", label: "Customer" }
          ]}
        />
      </div>
    </div>
  );
};
