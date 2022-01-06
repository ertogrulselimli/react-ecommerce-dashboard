import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { injectIntl, FormattedMessage } from "react-intl";
import { Field, Formik, FieldArray } from "formik";
import * as yup from "yup";
import validationMessages from "../../../../messages/validation";

import ArtAndBarCategoryField from "../../top-sales/components/fields/top-sales-form-field-category";
import ArtAndBarProductField from "../../top-sales/components/fields/top-sales-form-field-product";
import ArtAndBarShopField from "../components/fields/articuleandbarcode-form-field-shop";

class ArticuleandbarcodeForm extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };

    this.validation = yup.object().shape({
      categoryId: yup
        .number()
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

  submit(values) {
    this.props.onSubmit(values);
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
        </Nav>

        <Formik
          initialValues={{
            id: initalData.id,
            shopId: initalData.shopId || null,
            productId: initalData.productId || null,
            categoryId: initalData.categoryId || null,
            articuleNumber: initalData.articuleNumber || "",
            barCode: initalData.barCode || "",
            partnersItemName: initalData.partnersItemName || "",
            partnersItemModel: initalData.partnersItemModel || "",
            categoryDescription: initalData.categoryDescription || "",
            shopDescription: initalData.shopDescription || "",
            productDescription: initalData.productDescription || ""
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
                    <div className="row mt-3">
                      <div className="col-6">
                        <div className="form-group">
                          <label className="control-label">
                            <FormattedMessage
                              id="articuleandbarcode.form.articuleNumber.label"
                              defaultMessage="Articule number"
                            />
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            name="articuleNumber"
                          />
                        </div>
                        <div className="form-group">
                          <label className="control-label">
                            <FormattedMessage
                              id="articuleandbarcode.form.barCode.label"
                              defaultMessage="Barcode"
                            />
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            name="barCode"
                          />
                        </div>
                        <div className="form-group">
                          <ArtAndBarCategoryField
                            formik={formik}
                            categories={this.props.categories}
                          />
                        </div>
                        <div className="form-group">
                          <ArtAndBarShopField formik={formik} />
                        </div>
                        <div className="form-group">
                          <ArtAndBarProductField formik={formik} />
                        </div>
                        <div className="form-group">
                          <label className="control-label">
                            <FormattedMessage
                              id="articuleandbarcode.form.partnersItemName.label"
                              defaultMessage="Partners Item Name"
                            />
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            name="partnersItemName"
                          />
                        </div>
                        <div className="form-group">
                          <label className="control-label">
                            <FormattedMessage
                              id="articuleandbarcode.form.partnersItemModel.label"
                              defaultMessage="Partners Item Model"
                            />
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            name="partnersItemModel"
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

export default injectIntl(ArticuleandbarcodeForm);
