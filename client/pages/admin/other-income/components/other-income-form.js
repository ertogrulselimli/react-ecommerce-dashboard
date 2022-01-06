import React from "react";
import FieldsErrorMessages from "../../../../components/validation/FieldsErrorMessages";
import { TabContent, TabPane, Nav, NavItem, NavLink, Alert } from "reactstrap";
import classnames from "classnames";
import { injectIntl, FormattedMessage, defineMessages } from "react-intl";
import { Field, Formik, FieldArray, Form } from "formik";
import * as yup from "yup";
import validationMessages from "../../../../messages/validation";
import FormNavLinks from "../../../../components/form-elements/form-nav-links";
// import LocalizationFields from "../../../../components/form-elements/localization-fields";
// import TypeOfIncomeFilterInput from "./type-of-incomes-filter-input";
// import OtherShopFilterInput from "./other-shop-filter-input";
import {MXNumberInput, MXTextInput} from "../../common/fields/standard-formik-input-elements";
import MXDynamicSelectInput from "../../common/mx-dynamic-select-input";
import {shopFilterUrl, typeOfIncomeFilterUrl} from "../../common/constants";

const navLinks = defineMessages({
  main: {
    id: "other.income.form.link.main_information",
    defaultMessage: "Əsas məlumatlar"
  }
});

class OtherIncomeForm extends React.Component {
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
      amount: yup
        .number()
        .min(0)
        .required(props.intl.formatMessage(validationMessages.required)),
      activationDateFrom: yup
        .date()
        .required(props.intl.formatMessage(validationMessages.required)),
      activationDateTo: yup
        .date()
        .min(
          yup.ref("activationDateFrom"),
          props.intl.formatMessage(validationMessages.dateRange)
        )
        .required(props.intl.formatMessage(validationMessages.required))
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
          shopId: initalData.shopId,
          typeOfIncomeId: initalData.typeOfIncomeId,
          amount: initalData.amount || 0,
          typeOfIncomeDescription: initalData.typeOfIncomeDescription || "",
          shopDescription: initalData.shopDescription || "",
          activationDateFrom: initalData.activationDateFrom || "",
          activationDateTo: initalData.activationDateTo || ""
        }}
        onSubmit={this.props.submit}
        validationSchema={this.validation}
        validateOnBlur={true}
        validateOnChange={true}
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
                    <div className="col-5">

                      {/*<div className="form-group">*/}
                      {/*  <label className="control-label">*/}
                      {/*    <FormattedMessage*/}
                      {/*      id="other.income.form.amount.label"*/}
                      {/*      defaultMessage="Amount"*/}
                      {/*    />*/}
                      {/*  </label>*/}
                      {/*  <Field*/}
                      {/*    type="number"*/}
                      {/*    className="form-control"*/}
                      {/*    name="amount"*/}
                      {/*  />*/}
                      {/*  <FieldsErrorMessages*/}
                      {/*    show={props.errors.amount}*/}
                      {/*    messages={[props.errors.amount]}*/}
                      {/*  />*/}
                      {/*</div>*/}

                      <MXNumberInput
                          intlMessageId="other.income.form.amount.label"
                          intlDefaultMessage="Amount"
                          fieldErrorMessage={[props.errors.amount]}
                          fieldName="amount"
                      />

                    </div>
                    <div className="offset-2 col-5">

                      {/*<div className="form-group">*/}
                      {/*  <label className="control-label">*/}
                      {/*    <FormattedMessage*/}
                      {/*      id="other.income.form.shop.label"*/}
                      {/*      defaultMessage="Shop"*/}
                      {/*    />*/}
                      {/*  </label>*/}
                      {/*  <OtherShopFilterInput*/}
                      {/*    onChange={itemName => {*/}
                      {/*      props.setFieldValue("shopId", itemName.value);*/}
                      {/*      props.setFieldValue(*/}
                      {/*        "shopDescription",*/}
                      {/*        itemName.label*/}
                      {/*      );*/}
                      {/*    }}*/}
                      {/*    value={{*/}
                      {/*      value: props.values.shopId,*/}
                      {/*      label: props.values.shopDescription*/}
                      {/*    }}*/}
                      {/*  />*/}
                      {/*</div>*/}

                      <MXDynamicSelectInput
                          formik={props}
                          intlMessageId="other.income.form.shop.label"
                          intlDefaultMessage="Shop"
                          fieldId="shopId"
                          fieldDescription="shopDescription"
                          filterUrl={shopFilterUrl}
                      />

                    </div>
                    <div className="col-5">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="other.income.list.form.activationDateFrom.label"
                            defaultMessage="Activation Date From"
                          />
                        </label>
                        <Field
                          type="date"
                          className="form-control"
                          name="activationDateFrom"
                        />
                        <FieldsErrorMessages
                          show={props.errors.activationDateFrom}
                          messages={[props.errors.activationDateFrom]}
                        />
                      </div>
                    </div>
                    <div className="offset-2 col-5">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="other.income.list.form.activationDateTo.label"
                            defaultMessage="Activation Date To"
                          />
                        </label>
                        <Field
                          type="date"
                          className="form-control"
                          name="activationDateTo"
                        />
                        <FieldsErrorMessages
                          show={props.errors.activationDateTo}
                          messages={[props.errors.activationDateTo]}
                        />
                      </div>
                    </div>
                    <div className="col-5">

                      {/*<div className="form-group">*/}
                      {/*  <label className="control-label">*/}
                      {/*    <FormattedMessage*/}
                      {/*      id="other.income.form.typeOfIncomeDescription.label"*/}
                      {/*      defaultMessage="Type of Income"*/}
                      {/*    />*/}
                      {/*  </label>*/}
                      {/*  <TypeOfIncomeFilterInput*/}
                      {/*    onChange={itemName => {*/}
                      {/*      props.setFieldValue(*/}
                      {/*        "typeOfIncomeId",*/}
                      {/*        itemName.value*/}
                      {/*      );*/}
                      {/*      props.setFieldValue(*/}
                      {/*        "typeOfIncomeDescription",*/}
                      {/*        itemName.label*/}
                      {/*      );*/}
                      {/*    }}*/}
                      {/*    value={{*/}
                      {/*      value: props.values.typeOfIncomeId,*/}
                      {/*      label: props.values.typeOfIncomeDescription*/}
                      {/*    }}*/}
                      {/*  />*/}
                      {/*</div>*/}
                      <MXDynamicSelectInput
                          formik={props}
                          intlMessageId="other.income.form.typeOfIncomeDescription.label"
                          intlDefaultMessage="Type of Income"
                          fieldId="typeOfIncomeId"
                          fieldDescription="typeOfIncomeDescription"
                          filterUrl={typeOfIncomeFilterUrl}
                      />

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

export default injectIntl(OtherIncomeForm);
