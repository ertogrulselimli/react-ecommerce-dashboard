import { defineMessages } from "react-intl";

export default defineMessages({
  required: {
    id: "validation.required",
    defaultMessage: "Field is required"
  },
  email: {
    id: "validation.email",
    defaultMessage: "Email is not valid"
  },
  confirmPassword: {
    id: "validation.confirm_password_not_match",
    defaultMessage: "Password does not match"
  },
  valueAlreadySelected: {
    id: "validation.value_already_selected",
    defaultMessage: "This value is already selected"
  },
  valueRange: {
    id: "validation.price_list_value_range",
    defaultMessage: "Value must be in 0-100 range"
  },
  dateRange: {
    id: "validation.other_income_date_ranger",
    defaultMessage: "Activation date to must be minimum activation date from"
  }
});
