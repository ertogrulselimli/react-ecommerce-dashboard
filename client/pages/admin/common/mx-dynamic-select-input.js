/**
 * Created by Administrator on 4/13/2019.
 * Note while using these we get rid of a lot of javascript files like item-mapping-form-field-shop,item-mapping-form-field-item-name and etc....
 * alse redundant selectInputs like ItemNameSelectInput and etc we have already got rid of this select inputs by developing common-entity-select-input
 */
import React from "react";
import PaginatedSelect from "./mx-paginated-select-filter";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import FieldsErrorMessages from "../../../components/validation/FieldsErrorMessages";

class MXDynamicSelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(entity) {
    this.props.formik.setFieldValue(this.props.fieldId, entity.value);
    this.props.formik.setFieldValue(this.props.fieldDescription, entity.label);
  }

  render() {
    if (this.props.showInput === false) {
      return null;
    }
    const {
      formik,
      fieldId,
      fieldDescription,
      filters,
      filterUrl,
      intlMessageId,
      intlDefaultMessage,
      divClassName,
      labelClassName,
      fieldErrorMessage,
      ...props
    } = this.props;
    return (
      <div className={divClassName || "form-group"}>
        <label className={labelClassName || "control-label"}>
          {this.props.intl.formatMessage({
            id: intlMessageId,
            defaultMessage: intlDefaultMessage
          })}
        </label>
        <PaginatedSelect
          filters={filters}
          filterUrl={filterUrl}
          onChange={this.onChange}
          value={{
            value: formik.values[fieldId],
            label: formik.values[fieldDescription]
          }}
          {...props}
        />
        <FieldsErrorMessages messages={fieldErrorMessage} />
      </div>
    );
  }
}

MXDynamicSelectInput.PropTypes = {
  //fieldClassName:PropTypes.string, //  css class of disabled input element
  labelClassName: PropTypes.string, // css class of label
  divClassName: PropTypes.string, // css class of div that contain label and disabled input
  fieldId: PropTypes.string, //name of formik element that will be send to server via submit
  fieldDescription: PropTypes.string, //name of formik element that will be shown
  intlMessageId: PropTypes.string, // internalizaion label id
  intlDefaultMessage: PropTypes.string, //internalization default message
  showInput: PropTypes.bool, //boolean value if true this input will be visible in form else invisible
  filterUrl: PropTypes.string, // filterUrl of service that all content will come from for filling react table inside drop down
  additionalFilters: PropTypes.array //additional filters for service filterUrl,
  //formik:PropTypes.  which formik this input elemnet belogs t
};

export default injectIntl(MXDynamicSelectInput);
