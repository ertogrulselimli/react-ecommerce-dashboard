import { FormattedMessage } from "react-intl";
import React from "react";
import { Field } from "formik";

export default () => {
  return (
    <div className="form-group">
      <label className="control-label">
        <FormattedMessage
          id="product.form.item_type.label"
          defaultMessage="Item type"
        />
      </label>
      <Field component="select" name="itemType" className="form-control">
        <option value="GOOD">GOOD</option>
        <option value="SERVICE">SERVICE</option>
      </Field>
    </div>
  );
};
