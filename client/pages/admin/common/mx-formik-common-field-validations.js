/**
 * Created by Administrator on 4/17/2019.
 */
import React from "react";
import * as yup from "yup";
import validationMessages from "../../../messages/validation";

export function localizationFieldValidation(intl) {
  return yup
    .array()
    .test(
      "localization",
      intl.formatMessage(validationMessages.required),
      v =>
        v.length &&
        v.findIndex(l => l.language === "az" && l.translation.length > 0) >= 0
    );
}

export function descriptionFieldValidation(intl) {
  return yup
    .string()
    .trim()
    .required(intl.formatMessage(validationMessages.required));
}
