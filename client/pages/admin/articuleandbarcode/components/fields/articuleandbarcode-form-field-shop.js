import { FormattedMessage } from "react-intl";
import React from "react";
import ShopFilterInput from "../../../shop/components/shop-filter-input";

export default ({ formik }) => {
  return (
    <div className="form-group">
      <label className="control-label">
        <FormattedMessage
          id="articuleandbarcode.form.shopDescription.label"
          defaultMessage="Shop"
        />
      </label>

      <ShopFilterInput
        key={formik.values.shopId}
        filter={{
          shopId: formik.values.shopId,
          filter: ""
        }}
        onChange={p => {
          formik.setFieldValue("shopId", p.value);
          formik.setFieldValue("shopDescription", p.label);
        }}
        value={{
          value: formik.values.shopId,
          label: formik.values.shopDescription
        }}
      />
    </div>
  );
};
