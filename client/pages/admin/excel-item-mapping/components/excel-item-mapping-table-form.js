import React from "react";
import api from "../../../../api";
import SweetAlert from "react-bootstrap-sweetalert";
import { injectIntl, FormattedMessage, defineMessages } from "react-intl";
import classnames from "classnames";
import CategoryFilterInput, {
  dataToSelectOptions as categoryToSelectOptions
} from "../../catalog/components/category-filter-input";
import BrandSelectInput, {
  dataToSelectOptions as brandToSelectOptions
} from "../../brands/components/brand-select-input";

import ItemNameSelectInput from "../../item-name/components/item-name-select-input";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        id: props.data.id,
        platformCategoryId: props.data.platformCategoryId,
        platformCategoryDescription: props.data.platformCategoryDescription,
        platFormBrandId: props.data.platFormBrandId,
        platformBrandDescription: props.data.platformBrandDescription,
        platformItemNameId: props.data.platformItemNameId,
        platformItemNameDescription: props.data.platformItemNameDescription,
        platformModel: props.data.platformModel || ""
      },
      itemNames: [],
      mapped: props.isMapped
    };
  }

  onFieldChange(data) {
    this.setState({ form: { ...this.state.form, ...data } });
  }

  dissmissAlert() {
    this.setState({ sweetAlertMsg: null });
  }

  submit() {
    this.setState({ saving: true });
    api
      .post("item-mapping-excels/item-mapping-excel/map", [this.state.form])
      .then(response => {
        this.setState({ mapped: true });
      })
      .catch(error => {
        //TODO Check data message exists
        this.setState({
          saving: false,
          sweetAlertMsg: error.response.data.message
        });
      });
  }

  undo() {
    api
      .post("item-mapping-excels/item-mapping-excel/unmap", [this.state.form])
      .then(response => {
        this.setState({ mapped: false });
      })
      .catch(error => {
        //TODO Check data message exists
        this.setState({
          saving: false,
          sweetAlertMsg: error.response.data.message
        });
      });
  }

  approve() {
    api
      .post("item-mapping-excels/item-mapping-excel/approve", [this.state.form])
      .then(response => {
        this.setState({ approved: true });
      })
      .catch(error => {
        //TODO Check data message exists
        this.setState({
          saving: false,
          sweetAlertMsg: error.response.data.message
        });
      });
  }

  render() {
    const { form } = this.state;

    return (
      <div className="row" onClick={e => e.stopPropagation()}>
        <div className="col-11">
          <div className="row">
            <div className="col-3">
              <CategoryFilterInput
                isDisabled={this.state.mapped}
                filter={{
                  active: "YES",
                  concrete: true,
                  filter: ""
                }}
                onChange={category => {
                  this.onFieldChange({
                    platformCategoryId: category ? category.value : null,
                    platformCategoryDescription: category
                      ? category.label
                      : null
                  });
                }}
                value={{
                  value: form.platformCategoryId,
                  label: form.platformCategoryDescription
                }}
                defaultOptions={categoryToSelectOptions(
                  this.props.categoryDefaultOptions
                )}
              />
            </div>

            <div className="col-3">
              <BrandSelectInput
                isDisabled={this.state.mapped}
                active="YES"
                defaultOptions={brandToSelectOptions(
                  this.props.brandDefaultOptions
                )}
                onChange={brand => {
                  this.onFieldChange({
                    platFormBrandId: brand ? brand.value : null,
                    platformBrandDescription: brand ? brand.label : null
                  });
                }}
                value={{
                  value: form.platFormBrandId,
                  label: form.platformBrandDescription
                }}
              />
            </div>

            <div className="col-3">
              <ItemNameSelectInput
                isDisabled={
                  !this.state.form.platformCategoryId || this.state.mapped
                }
                key={this.state.form.platformCategoryId}
                filter={{
                  active: "ALL",
                  categoryId: this.state.form.platformCategoryId,
                  filter: ""
                }}
                onChange={itemName => {
                  this.onFieldChange({
                    platformItemNameId: itemName ? itemName.value : null,
                    platformItemNameDescription: itemName
                      ? itemName.label
                      : null
                  });
                }}
                requestFilter={e => {
                  return this.state.form.platformCategoryId;
                }}
                value={{
                  value: form.platformItemNameId,
                  label: form.platformItemNameDescription
                }}
              />
            </div>

            <div className="col-3">
              <input
                disabled={this.state.mapped}
                placeholder="Platform product model"
                className="form-control"
                value={this.state.form.platformModel}
                onChange={e => {
                  this.onFieldChange({ platformModel: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-1 p-0">
          <button
            onClick={this.submit.bind(this)}
            className={classnames([
              "btn btn-success btn-circle btn-sm",
              {
                "d-none": this.state.mapped
              }
            ])}
          >
            <i className="fa fa-save" />
          </button>
          <button
            onClick={this.undo.bind(this)}
            className={classnames([
              "btn btn-info btn-circle btn-sm",
              {
                "d-none": !this.state.mapped
              }
            ])}
          >
            <i className="fa fa-undo text-white" />
          </button>
          <button
            onClick={this.approve.bind(this)}
            className={classnames([
              "btn btn-success btn-circle btn-sm ml-1",
              {
                "d-none": !this.props.isMapped
              }
            ])}
          >
            <i className="fa fa-check" />
          </button>
        </div>

        <SweetAlert
          show={!!this.state.sweetAlertMsg}
          error
          confirmBtnText="Ok"
          confirmBtnBsStyle="danger"
          btnSize="xs"
          title=""
          onConfirm={this.dissmissAlert.bind(this)}
          onCancel={this.dissmissAlert.bind(this)}
        >
          {this.state.sweetAlertMsg}
        </SweetAlert>
      </div>
    );
  }
}
