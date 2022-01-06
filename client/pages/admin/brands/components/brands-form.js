import React from "react";
import { TabContent, TabPane } from "reactstrap";
import { defineMessages, injectIntl } from "react-intl";
import { Formik ,Form} from "formik";
import * as yup from "yup";
import FormNavLinks from "../../../../components/form-elements/form-nav-links";
import LocalizationFields from "../../../../components/form-elements/localization-fields";
import {localizationFieldValidation, descriptionFieldValidation} from "../../common/mx-formik-common-field-validations";
import MXDynamicSelectInput from "../../common/mx-dynamic-select-input";
import {MXCheckboxInput,MXTextInput} from "../../common/fields/standard-formik-input-elements";
import { brandFilterUrl } from "../../common/constants";



const navLinks = defineMessages({
  main: {
    id: "brand.form.link.main_information",
    defaultMessage: "Əsas məlumatlar"
  },

  localization: {
    id: "brand.form.link.localization",
    defaultMessage: "Localization"
  }
});


class BrandsForm extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      navLinks: [
        {
          tab: "1",
          title: props.intl.formatMessage(navLinks.main)
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

    const initalData = this.props.formData;
    
    return (
      <Formik
          enableReinitialize={true}
          initialValues={{
          id: initalData.id,
          active: initalData.active || true,
          displayName: initalData.displayName || [],
          brandCodeMapping: initalData.brandCodeMapping || null,
          brandDescriptionMapping: initalData.brandDescriptionMapping || null,
          description: initalData.description || ""
        }}
          onSubmit={this.props.submit}
          validationSchema={this.validation}
          validateOnBlur={false}
          validateOnChange={false}
      >
        {props => {

          console.log(props);

          this.props.bindSubmit(props.handleSubmit);
          return (
            <Form onSubmit={(e)=>{e.preventDefault();}}>

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
                      <MXTextInput
                        intlMessageId="brands.form.description.label"
                        intlDefaultMessage="Description"
                        fieldErrorMessage={[props.errors.description]}
                        fieldName="description"
                      />
                      <MXDynamicSelectInput
                        formik={props}
                        intlMessageId="brand.form.name_code_mapping.label"
                        intlDefaultMessage="Brand mapping"
                        fieldId="brandCodeMapping"
                        fieldDescription="brandDescriptionMapping"
                        filterUrl={brandFilterUrl}
                        showInput={props.values.id ? true : false}
                      />
                      <div className="row">
                        <div className="col-12">
                          <LocalizationFields
                            error={props.errors.displayName}
                            values={props.values.displayName}
                            onValueChange={values => {
                              props.setFieldValue("displayName", values);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="hidden"
                    type="submit"
                    style={{ display: "none" }}
                  />
                </TabPane>

                <TabPane tabId="2" />
              </TabContent>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default injectIntl(BrandsForm);
