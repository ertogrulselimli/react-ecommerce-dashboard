import React from "react";
import {Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import {Field, Formik} from "formik";
import * as yup from "yup";
import validationMessages from "../../../../messages/validation";
import {displayName} from "../../../../helpers";
import AttributeSelect2 from "../../attribute/components/attribute-select2";

const Form = props => {
  if (props.hide) return null;

  return (
    <div className="row">
      <div className="col-12">
        <p>
          Attribute name:{" "}
          <b>{displayName(props.values.attribute.displayName)}</b>
        </p>

        <div className="form-group">
          <label>Rank</label>
          <Field type="text" className="form-control" name="rank" />
        </div>

        <div className="form-check">
          <Field
            type="checkbox"
            className="form-check-input"
            name="mandatory"
            id="mandatory"
            checked={props.values.mandatory}
          />
          <label className="form-check-label" htmlFor="mandatory">
            <FormattedMessage
              id="product_type.attribute.form.mandatory.label"
              defaultMessage="Mandatory"
            />
          </label>
        </div>

        <div className="form-check">
          <Field
            type="checkbox"
            className="form-check-input"
            name="showInFilters"
            id="showInFilters"
            checked={props.values.showInFilters}
          />
          <label className="form-check-label" htmlFor="showInFilters">
            <FormattedMessage
              id="product_type.attribute.form.showInFilters.label"
              defaultMessage="Show in filters"
            />
          </label>
        </div>

        {/*<div className="mt-2">*/}
        {/*<ValueIcon value={props.values.attribute.store}/> Store value in index*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<ValueIcon value={props.values.attribute.search}/> Value is searcheable*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<ValueIcon value={props.values.attribute.primary}/> Value is primary key (exact matches)*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<ValueIcon value={props.values.attribute.navigation}/> Value is navigatable*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

class ProductTypeAttributeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1"
    };

    let attributeIdsAlreadySelected = props.attributes.map(attr => {
      if (
        props.formData.attribute &&
        attr.attribute.id === props.formData.attribute.id
      ) {
        return "";
      }
      return attr.attribute.id;
    });

    this.validation = yup.object().shape({
      attribute: yup.object().shape({
        id: yup
          .number()
          .notOneOf(
            attributeIdsAlreadySelected,
            props.intl.formatMessage(validationMessages.valueAlreadySelected)
          )
      })
    });
  }

  render() {
    const initalData = this.props.formData;

    return (
      <Modal
        isOpen={true}
        toggle={this.props.toggle}
        size="lg"
        className="modal-content-big"
      >
        <ModalHeader>Attributes</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              id: initalData.id || null,
              productTypeId: this.props.productTypeId,
              initalCreate: initalData.initalCreate || false,
              attribute: initalData.attribute || null,
              rank: initalData.rank || "",
              active: initalData.active || true,
              mandatory: initalData.mandatory || false,
              showInFilters: initalData.showInFilters || false,
              crud: initalData.crud || null
            }}
            onSubmit={this.props.onSubmit}
            validationSchema={this.validation}
          >
            {subform => {
              this.handleSubmit = subform.handleSubmit;

              return (
                <form>
                  <Alert isOpen={!!subform.errors.attribute} color="danger">
                    <div>
                      {subform.errors.attribute
                        ? subform.errors.attribute.id
                        : null}
                    </div>
                  </Alert>
                  <AttributeSelect2
                    /* active="YES"*/
                      attributeTypes={["LIST", "TEXT"]}
                      onSelectEntity={attribute => {
                      subform.setFieldValue("attribute", attribute, true);
                      subform.setFieldValue("rank", attribute.rank);
                    }}
                    hide={!subform.errors.attribute && subform.values.attribute}
                  />

                  <Form
                    hide={subform.errors.attribute || !subform.values.attribute}
                    {...subform}
                  />
                </form>
              );
            }}
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={this.props.toggle}>
            Cancel
          </Button>
          <Button color="success" onClick={() => this.handleSubmit()}>
            Change
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default injectIntl(ProductTypeAttributeForm);
