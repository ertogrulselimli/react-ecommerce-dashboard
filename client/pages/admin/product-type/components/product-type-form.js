import React from "react";
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import {FormattedMessage, injectIntl, defineMessages} from "react-intl";
import {Field, Formik, Form} from "formik";
import * as yup from "yup";
import { descriptionFieldValidation} from "../../common/mx-formik-common-field-validations";
import {MXTextInput} from "../../common/fields/standard-formik-input-elements";
import classnames from "classnames";
import  ProductTypeAttributes from './product-type-attributes'

class ProductTypeForm extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };

    this.validation = yup.object().shape({
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
          description: initalData.description || "",
          attributes: initalData.attributes || []
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
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={this.toggle.bind(this, "1")}
                  >
                    <FormattedMessage
                      id="common.main_information"
                      defaultMessage="Main"
                    />
                  </NavLink>
                </NavItem>

              </Nav>

              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <div className="row mt-3">
                    <div className="col-12">
                      <div className="col-6">
                        <MXTextInput
                            divClassName="form-group mt-3"
                            intlMessageId="brands.form.description.label"
                            intlDefaultMessage="Description"
                            fieldErrorMessage={[props.errors.description]}
                            fieldName="description"
                        />
                      </div>

                      <div className="col-12">
                        <FormattedMessage
                          id="common.attributes"
                          defaultMessage="Attributes"
                        />
                        <ProductTypeAttributes
                          auth={this.props.auth}
                          attributes={props.values.attributes}
                          producttypeId={initalData.id}
                          onChange={attributes => {
                            props.setFieldValue("attributes", attributes);
                          }}
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
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default injectIntl(ProductTypeForm);
