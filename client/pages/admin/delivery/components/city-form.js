import React from "react";
import FieldsErrorMessages from "../../../../components/validation/FieldsErrorMessages";
import { TabContent, TabPane, Nav, NavItem, NavLink, Alert } from "reactstrap";
import classnames from "classnames";
import { injectIntl, FormattedMessage, defineMessages } from "react-intl";
import { Field, Formik, FieldArray } from "formik";
import * as yup from "yup";
import validationMessages from "../../../../messages/validation";
import LocalizationFields from "../../../../components/form-elements/localization-fields";
import FormNavLinks from "../../../../components/form-elements/form-nav-links";
import { displayName } from "../../../../helpers";

const navLinks = defineMessages({
  main: {
    id: "city.form.link.main_information",
    defaultMessage: "Əsas məlumatlar"
  },
  localization: {
    id: "city.form.link.localization",
    defaultMessage: "Localization"
  }
});

class CityForm extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      navLinks: [
        {
          tab: "1",
          title: props.intl.formatMessage(navLinks.main)
        },
        {
          tab: "2",
          title: props.intl.formatMessage(navLinks.localization),
          fields: ["displayName"]
        }
      ]
    };

    this.validation = yup.object().shape({
      displayName: yup
        .array()
        .test(
          "localization",
          props.intl.formatMessage(validationMessages.required),
          v =>
            v.length &&
            v.findIndex(l => l.language === "az" && l.translation.length > 0) >=
              0
        )
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  submit(values) {
    this.props.onSubmit(values);
  }

  render() {
    const initalData = this.props.formData;

    return (
      <Formik
        initialValues={{
          id: initalData.id,
          displayName: initalData.displayName || [],
          code: initalData.code,
          description: initalData.description || ""
        }}
        onSubmit={this.submit.bind(this)}
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
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="city.form.code.label"
                            defaultMessage="Code"
                          />
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="code"
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="city.form.description.label"
                            defaultMessage="Description"
                          />
                        </label>
                        <Field
                          component="textarea"
                          type="text"
                          className="form-control"
                          name="description"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="hidden"
                    type="submit"
                    style={{ display: "none" }}
                  />
                </TabPane>

                <TabPane tabId="2">
                  <div className="row">
                    <div className="col-6">
                      <LocalizationFields
                        error={props.errors.displayName}
                        values={props.values.displayName}
                        onValueChange={values => {
                          props.setFieldValue("displayName", values);
                        }}
                      />
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default injectIntl(CityForm);
