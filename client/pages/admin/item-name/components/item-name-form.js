import React from "react";
import { TabContent, TabPane} from "reactstrap";
import { injectIntl, FormattedMessage, defineMessages } from "react-intl";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormNavLinks from "../../../../components/form-elements/form-nav-links";
import LocalizationFields from "../../../../components/form-elements/localization-fields";
import {
  descriptionFieldValidation,
  localizationFieldValidation
} from "../../common/mx-formik-common-field-validations";
import { itemNameFilterUrl, categoryFilterUrl } from "../../common/constants";
import { MXTextInput } from "../../common/fields/standard-formik-input-elements";
import MXDynamicSelectInput from "../../common/mx-dynamic-select-input";
import CategorySelectInput from "../../catalog/components/category-select-input";
import { displayName } from "../../../../helpers";

const navLinks = defineMessages({
  main: {
    id: "item_name.form.link.main_information",
    defaultMessage: "Əsas məlumatlar"
  },
  localization: {
    id: "item_name.form.link.localization",
    defaultMessage: "Localization"
  }
});

class ItemNameForm extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      navLinks: [
        {
          tab: "1",
          title: props.intl.formatMessage(navLinks.main),
          fields: ["categoryId"]
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
              categoryDescription: initalData.categoryDescription || "",
              categoryId: initalData.categoryId || null,
              displayName: initalData.displayName || [],
              description: initalData.description || "",
              nameCodeMapping: initalData.nameCodeMapping || null,
              nameDescMapping: initalData.nameDescMapping || ""
            }}
            onSubmit={this.props.submit}
            validationSchema={this.validation}
            validateOnBlur={false}
            validateOnChange={false}
        >
          {props => {
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

                          <CategorySelectInput
                              label={
                                <FormattedMessage
                                    id="item_name.form.category.label"
                                    defaultMessage="Category"
                                />
                              }
                              categories={this.props.categories}
                              valueProperty="id"
                              value={props.values.categoryId}
                              name={props.values.categoryDescription}
                              onChange={selected => {
                                props.setFieldValue(
                                    "categoryId",
                                    selected.category.id
                                );
                                props.setFieldValue(
                                    "categoryDescription",
                                    selected.category.description
                                );
                              }}
                          />
                          <MXTextInput
                              intlMessageId="item_name.form.description.label"
                              intlDefaultMessage="Description"
                              fieldErrorMessage={[props.errors.description]}
                              fieldName="description"
                          />
                          <MXDynamicSelectInput
                              formik={props}
                              intlMessageId="item_name.form.name_code_mapping.label"
                              intlDefaultMessage="Item Name mapping"
                              fieldId="nameCodeMapping"
                              fieldDescription="nameDescMapping"
                              filterUrl={itemNameFilterUrl}
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
                  </TabContent>
                </Form>
            );
          }}
        </Formik>
    );
  }
}

export default injectIntl(ItemNameForm);
