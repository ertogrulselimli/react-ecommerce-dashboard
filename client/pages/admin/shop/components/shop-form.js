import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { injectIntl, FormattedMessage } from "react-intl";
import classnames from "classnames";
import { Field, Formik, FieldArray, Form } from "formik";
import * as yup from "yup";
import validationMessages from "../../../../messages/validation";
import ShopFormTabMainInformations from "./form/shop-form-tab-main-informations";
import ShopFormTabMediaFiles from "./form/shop-form-tab-media-files";
import OtherIncomeInfo from "./other-income-info";
import CommissionCategoryInfo from "./comission-category-info";
import { descriptionFieldValidation } from "../../common/mx-formik-common-field-validations";

class ShopFrom extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };

    this.validation = yup.object().shape({
      comission: yup
        .number()
        .min(0, props.intl.formatMessage(validationMessages.valueRange))
        .max(100, props.intl.formatMessage(validationMessages.valueRange)),
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

  submit(values) {
    this.props.submit(values);
  }

  render() {
    const initalData = this.props.formData;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={this.toggle.bind(this, "1")}
            >
              <FormattedMessage
                id="product.form.link.main_information"
                defaultMessage="Main"
              />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={this.toggle.bind(this, "2")}
            >
              <FormattedMessage
                id="product.form.link.shop_medias"
                defaultMessage="Shop medias"
              />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={this.toggle.bind(this, "3")}
            >
              <FormattedMessage
                id="shop.form.link.other_income"
                defaultMessage="Other Income Information"
              />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={this.toggle.bind(this, "4")}
            >
              <FormattedMessage
                id="shop.form.link.commision_by_categories"
                defaultMessage="Commision By Categories Information"
              />
            </NavLink>
          </NavItem>
        </Nav>

        <Formik
          initialValues={{
            id: initalData.id || "",
            comission: initalData.comission || 0,
            displayGoodsOnSeperateCard: initalData.displayGoodsOnSeperateCard || false,
            description: initalData.description || "",
            type: initalData.type || "",
            shopMedias: initalData.shopMedias || [],
            comissionByCategories: initalData.comissionByCategories || [],
            otherIncomes: initalData.otherIncomes || []
          }}
          onSubmit={this.submit.bind(this)}
          validationSchema={this.validation}
        >
          {formik => {
            this.props.bindSubmit(formik.handleSubmit);
            return (
              <form onSubmit={formik.handleSubmit}>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <ShopFormTabMainInformations formik={formik} />
                  </TabPane>

                  <TabPane tabId="2">
                    <ShopFormTabMediaFiles formik={formik} />
                  </TabPane>
                  <TabPane tabId="3">
                    <OtherIncomeInfo
                      auth={this.props.auth}
                      shopId={initalData.id}
                      otherIncomes={initalData.otherIncomes}
                    />
                  </TabPane>
                  <TabPane tabId="4">
                    <CommissionCategoryInfo
                      auth={this.props.auth}
                      shopId={initalData.id}
                      comissionByCategories={initalData.comissionByCategories}
                    />
                  </TabPane>
                </TabContent>

                <button className="d-none" type="submit" />
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default injectIntl(ShopFrom);
