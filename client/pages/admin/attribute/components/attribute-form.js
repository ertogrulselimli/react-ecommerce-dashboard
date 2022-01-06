import React from "react";
import { TabContent, TabPane } from "reactstrap";
import { defineMessages, FormattedMessage, injectIntl } from "react-intl";
import { Field, Formik } from "formik";
import * as yup from "yup";
import validationMessages from "../../../../messages/validation";
import LocalizationFields from "../../../../components/form-elements/localization-fields";
import AttributeFormUnitOfMeasurements from "./attribute-form-unit-of-measurements";
import { displayName } from "../../../../helpers";
import AttributeValues from "../attribute-values";
import FormNavLinks from "../../../../components/form-elements/form-nav-links";
import {
  localizationFieldValidation,
  descriptionFieldValidation
} from "../../common/mx-formik-common-field-validations";
import { MXTextInput } from "../../common/fields/standard-formik-input-elements";

const navLinks = defineMessages({
  main: {
    id: "attributes.form.link.main_information",
    defaultMessage: "Əsas məlumatlar"
  },
  unitOfMeasurements: {
    id: "attributes.form.link.unit_of_measurement",
    defaultMessage: "Unit of measurements"
  },
  values: {
    id: "attributes.form.link.values",
    defaultMessage: "Values"
  }
});

class AttributeForm extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      navLinks: [
        {
          tab: "1",
          title: props.intl.formatMessage(navLinks.main),
          fields: ["displayName"]
        },
        {
          tab: "2",
          title: props.intl.formatMessage(navLinks.unitOfMeasurements),
          fields: ""
        },
        {
          tab: "5",
          title: props.intl.formatMessage(navLinks.values)
        }
      ]
    };

    this.validation = yup.object().shape({
      displayName: localizationFieldValidation(props.intl),
      description: descriptionFieldValidation(props.intl)
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const initialData = this.props.formData;

    return (
      <Formik
        initialValues={{
          attributegroupId: this.props.groupAttribute.attributegroupId,
          id: initialData.id,
          attributeMeasurements: (initialData.attributeMeasurements || []).map(
            u => ({ ...u.unitOfMeasurement, uId: u.id })
          ),
          description: initialData.description || "",
          valueType: initialData.valueType || "LIST",
          displayName: initialData.displayName || [],
          navigation: initialData.navigation || false,
          attributeValues: initialData.attributeValues || []
        }}
        onSubmit={this.props.onSubmit}
        validationSchema={this.validation}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {props => {
          this.props.bindSubmit(props.handleSubmit);
          return (
            <form onSubmit={props.handleSubmit}>
              <FormNavLinks
                active={this.state.activeTab}
                links={this.state.navLinks}
                onClick={this.toggle.bind(this)}
                errors={props.errors}
              />

              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <div className="row mt-3">
                    <div className="col-6">
                      <LocalizationFields
                        error={props.errors.displayName}
                        values={props.values.displayName}
                        onValueChange={values => {
                          props.setFieldValue("displayName", values);
                        }}
                      />

                      <MXTextInput
                        divClassname="form-group mt-3"
                        intlMessageId="attribute.form.description.label"
                        intlDefaultMessage="Description"
                        fieldErrorMessage={[props.errors.description]}
                        fieldName="description"
                      />
                    </div>
                  </div>
                  {/* <button
                    className="hidden"
                    type="submit"
                    style={{ display: "none" }}
                  /> */}
                </TabPane>

                <TabPane tabId="2">
                  <div className="row">
                    <div className="col-6">
                      <AttributeFormUnitOfMeasurements
                        list={props.values.attributeMeasurements}
                        attributeValues={props.values.attributeValues}
                        onChange={units => {
                          props.setFieldValue("attributeMeasurements", units);
                        }}
                      />
                    </div>
                  </div>
                </TabPane>

                <TabPane tabId="5">
                  <AttributeValues
                    auth={this.props.auth}
                    onChange={values => {
                      props.setFieldValue("attributeValues", values);
                    }}
                    uniteOfMeasurements={props.values.attributeMeasurements.filter(
                      u => u.crud !== "d"
                    )}
                    values={props.values.attributeValues}
                  />
                </TabPane>
              </TabContent>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default injectIntl(AttributeForm);
