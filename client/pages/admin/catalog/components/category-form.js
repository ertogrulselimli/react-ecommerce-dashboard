import React from "react";
import {TabContent, TabPane} from "reactstrap";
import {injectIntl, defineMessages} from "react-intl";
import {Formik, Form} from "formik";
import * as yup from "yup";
import FormNavLinks from "../../../../components/form-elements/form-nav-links";
import LocalizationFields from "../../../../components/form-elements/localization-fields";
import validationMessages from "../../../../messages/validation";
import {localizationFieldValidation,descriptionFieldValidation} from '../../common/mx-formik-common-field-validations'
import MXDynamicSelectInput from "../../common/mx-dynamic-select-input";
import {MXCheckboxInput, MXTextInput} from '../../common/fields/standard-formik-input-elements';
import api from "../../../../api";
import {findInCategoryTreeById} from "../utils";
import { productTypeFilterUrl} from '../../common/constants'
import CategoryFormFieldParent from "./fields/category-form-field-parent";

const navLinks = defineMessages({
    main: {
        id: "category.form.link.main_information",
        defaultMessage: "Əsas məlumatlar"
    }
});


class CatalogForm extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: "1",
            navLinks: [
                {
                    tab: "1",
                    title: props.intl.formatMessage(navLinks.main),
                    fields: ["code"]
                }
            ],
            siblings: [],
            topSalesCategories: []
        };

        this.validation = yup.object().shape({
            root: yup.boolean(),
            description: descriptionFieldValidation(props.intl),
            code: yup
                .string()
                .trim()
                .required(props.intl.formatMessage(validationMessages.required)),
            displayName: localizationFieldValidation(props.intl)
        });
    }


    componentDidMount() {
        if (this.props.formData.parentId) {
            this.setState({
                siblings: findInCategoryTreeById(
                    this.props.tree,
                    this.props.formData.parentId
                ).category.children
            });
        }

        //Find siblings for 'position' field when category edited
        if (this.props.formData.id) {
            this.setState({
                siblings: findInCategoryTreeById(
                    this.props.tree,
                    this.props.formData.id
                ).siblings
            });

            this.getTopSales(this.props.formData.parentId, this.props.formData.code);
        }
    }


    getTopSales(parentId, code) {
        api.get(`catalog/category/top-sales/${parentId}`).then(response => {
            this.setState({
                topSalesCategories: response.data.filter(
                    category => category.code !== code
                )
            });
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
                    categoryLevel: initalData.categoryLevel || 0,
                    code: initalData.code || "",
                    concrete: initalData.concrete || false,
                    description: initalData.description || "",
                    displayName: initalData.displayName || [],
                    parentName: initalData.parentName || "",
                    parentId: initalData.parentId || null,
                    productTypeId: initalData.productTypeId || null,
                    productTypeDescription: initalData.productTypeDescription || "",
                    root: initalData.root || false,
                    rank: initalData.rank || 0,
                    displayInMainFilteringTree: initalData.displayInMainFilteringTree || false,
                    doNotShowOutOfStock: initalData.doNotShowOutOfStock || false,
                    showInCategoryTopSales: initalData.showInCategoryTopSales || false,
                    topSalesRank: initalData.topSalesRank || 0
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
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">

                                                    <MXTextInput
                                                        intlMessageId="someid"
                                                        intlDefaultMessage="Code"
                                                        fieldErrorMessage={[props.errors.code]}
                                                        fieldName="code"
                                                    />

                                                    <MXCheckboxInput
                                                        intlMessageId="categories.form.root.label"
                                                        intlDefaultMessage="Root"
                                                        fieldName="root"
                                                        id="root-label"
                                                        checked={props.values.root}
                                                        onChange={e => {
                                                            let checked = e.target.checked;
                                                            props.setFieldValue("root", checked);
                                                            if (checked) {
                                                                this.setState({siblings: this.props.tree});
                                                                props.setFieldValue(
                                                                    "showInCategoryTopSales",
                                                                    false
                                                                );
                                                            } else {
                                                                props.setFieldValue("parentId", null);
                                                                props.setFieldValue("parentName", "");
                                                                this.setState({siblings: []});
                                                            }
                                                        }}
                                                    />

                                                    <CategoryFormFieldParent
                                                        categories={this.props.tree}
                                                        formik={props}
                                                        setSiblings={siblings => {
                                                            this.setState({siblings});
                                                        }}
                                                        onValueSet={parent => {
                                                            this.getTopSales(parent.id, props.values.code);
                                                        }}
                                                    />

                                                    <MXCheckboxInput
                                                        fieldName="concrete"
                                                        id="concrete"
                                                        checked={props.values.concrete}
                                                        intlMessageId="categories.form.concrete.label"
                                                        intlDefaultMessage="Concrete"
                                                    />

                                                    <MXDynamicSelectInput
                                                        formik={props}
                                                        intlMessageId="categories.form.product_type.label"
                                                        intlDefaultMessage="Product Type"
                                                        fieldId="productTypeId"
                                                        fieldDescription="productTypeDescription"
                                                        filterUrl={productTypeFilterUrl}
                                                        showInput={props.values.id ? true : false}
                                                    />


                                                    <MXTextInput
                                                        divClassName="form-group mt-3"
                                                        labelClassName="control-label"
                                                        intlMessageId="category.form.description.label"
                                                        intlDefaultMessage="Description"
                                                        fieldClassName="form-control"
                                                        fieldName="description"
                                                        fieldErrorMessage={[props.errors.description]}
                                                    />
                                                </div>

                                                <div className="col-6">
                                                    <LocalizationFields
                                                        error={props.errors.displayName}
                                                        values={props.values.displayName}
                                                        onValueChange={values => {
                                                            props.setFieldValue("displayName", values);
                                                        }}
                                                    />
                                                    <div className="mt-3"/>


                                                    <MXCheckboxInput
                                                        fieldName="displayInMainFilteringTree"
                                                        id="displayInMainFilteringTree"
                                                        checked={props.values.displayInMainFilteringTree}
                                                        intlMessageId="categories.form.display_in_main_filtering_tree.label"
                                                        intlDefaultMessage="Display in mail filtering tree"
                                                    />

                                                    <MXCheckboxInput
                                                        fieldName="doNotShowOutOfStock"
                                                        id="doNotShowOutOfStock"
                                                        checked={props.values.doNotShowOutOfStock}
                                                        intlMessageId="categories.form.do_not_show_out_of_stock.label"
                                                        intlDefaultMessage="Do not show out of stock"
                                                    />

                                                    <MXCheckboxInput
                                                        fieldName="showInCategoryTopSales"
                                                        id="showInCategoryTopSales"
                                                        checked={props.values.showInCategoryTopSales}
                                                        intlMessageId="categories.form.show_in_category_top_sales.label"
                                                        intlDefaultMessage="Show in category top sales"
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                            </TabContent>

                            <button className="d-none" type="submit"/>
                        </Form>
                    );
                }}
            </Formik>
        );
    }
}

export default injectIntl(CatalogForm);
