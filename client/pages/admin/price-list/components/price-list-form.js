import React from "react";
import FieldsErrorMessages from "../../../../components/validation/FieldsErrorMessages";
import { TabContent, TabPane, Nav, NavItem, NavLink, Alert } from "reactstrap";
import classnames from "classnames";
import { injectIntl, FormattedMessage, defineMessages } from "react-intl";
import { Field, Formik, FieldArray, DatePicker } from "formik";
import * as yup from "yup";
import validationMessages from "../../../../messages/validation";
import FormNavLinks from "../../../../components/form-elements/form-nav-links";

const navLinks = defineMessages({
  main: {
    id: "price.list.form.link.main_information",
    defaultMessage: "Əsas məlumatlar"
  }
});

class PriceListForm extends React.Component {
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
      comissionOfPlatformOwner: yup
        .number()
        .min(0, props.intl.formatMessage(validationMessages.valueRange))
        .max(100, props.intl.formatMessage(validationMessages.valueRange)),
      discountForQuantity: yup
        .number()
        .min(0, props.intl.formatMessage(validationMessages.valueRange))
        .max(100, props.intl.formatMessage(validationMessages.valueRange)),
      penaltyForGoodRefusal: yup
        .number()
        .min(0, props.intl.formatMessage(validationMessages.valueRange))
        .max(100, props.intl.formatMessage(validationMessages.valueRange))
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
          shopId: initalData.shopId || null,
          productId: initalData.productId || null,
          from: initalData.from || "",
          to: initalData.to || "",
          articuleNumber: initalData.articuleNumber || "",
          barCode: initalData.barCode || "",
          price: initalData.price || 0,
          saleQuantity: initalData.saleQuantity || 0,
          discountForQuantity: initalData.discountForQuantity || 0,
          available: initalData.available,
          expectedDeliveryTime: initalData.expectedDeliveryTime || 0,
          penaltyForGoodRefusal: initalData.penaltyForGoodRefusal || 0,
          comissionOfPlatformOwner: initalData.comissionOfPlatformOwner || 0,
          active: initalData.active || true
        }}
        onSubmit={this.submit.bind(this)}
        validationSchema={this.validation}
        validateOnBlur={true}
        validateOnChange={true}
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
                    <div className="col-12">
                      <div className="form-group">
                        <div className="form-check">
                          <Field
                            type="checkbox"
                            className="form-check-input"
                            name="available"
                            id="available"
                            checked={props.values.available}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="available"
                          >
                            <FormattedMessage
                              id="price.list.form.available.label"
                              defaultMessage="Available"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 d-inline-block">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="price.list.form.price.label"
                            defaultMessage="Price"
                          />
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          name="price"
                        />
                      </div>
                    </div>
                    <div className="col-6 d-inline-block">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="price.list.form.articuleNumber.label"
                            defaultMessage="Articule Number"
                          />
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="articuleNumber"
                        />
                      </div>
                    </div>
                    <div className="col-6 d-inline-block">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="price.list.form.barCode.label"
                            defaultMessage="Barcode"
                          />
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="barCode"
                        />
                      </div>
                    </div>
                    <div className="col-6 d-inline-block">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="price.list.form.comissionOfPlatformOwner.label"
                            defaultMessage="Comission of Platform Owner"
                          />
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          name="comissionOfPlatformOwner"
                        />
                        <FieldsErrorMessages
                          show={props.errors.comissionOfPlatformOwner}
                          messages={[props.errors.comissionOfPlatformOwner]}
                        />
                      </div>
                    </div>
                    <div className="col-6 d-inline-block">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="price.list.form.discountForQuantity.label"
                            defaultMessage="Discount For Quantity"
                          />
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          name="discountForQuantity"
                        />
                        <FieldsErrorMessages
                          show={props.errors.discountForQuantity}
                          messages={[props.errors.discountForQuantity]}
                        />
                      </div>
                    </div>
                    <div className="col-6 d-inline-block">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="price.list.form.penaltyForGoodRefusal.label"
                            defaultMessage="Penalty For Good Refusal"
                          />
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          name="penaltyForGoodRefusal"
                        />
                        <FieldsErrorMessages
                          show={props.errors.penaltyForGoodRefusal}
                          messages={[props.errors.penaltyForGoodRefusal]}
                        />
                      </div>
                    </div>
                    <div className="col-6 d-inline-block">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="price.list.form.saleQuantity.label"
                            defaultMessage="Sale Quantity"
                          />
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          name="saleQuantity"
                        />
                      </div>
                    </div>

                    <div className="col-6 d-inline-block">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="price.list.form.expectedDeliveryTime.label"
                            defaultMessage="Expected Delivery Time"
                          />
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          name="expectedDeliveryTime"
                        />
                      </div>
                    </div>
                    <div className="col-6 d-inline-block">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="price.list.form.from.label"
                            defaultMessage="From"
                          />
                        </label>
                        <Field
                          type="date"
                          className="form-control"
                          name="from"
                        />
                      </div>
                    </div>
                    <div className="col-6 d-inline-block">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="price.list.form.to.label"
                            defaultMessage="To"
                          />
                        </label>
                        <Field type="date" className="form-control" name="to" />
                      </div>
                    </div>
                    <div className="col-6 d-inline-block">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="price.list.form.shopId.label"
                            defaultMessage="Shop Id"
                          />
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          name="shopId"
                        />
                      </div>
                    </div>
                    <div className="col-6 d-inline-block">
                      <div className="form-group">
                        <label className="control-label">
                          <FormattedMessage
                            id="price.list.form.productId.label"
                            defaultMessage="Product Id"
                          />
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          name="productId"
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
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default injectIntl(PriceListForm);
