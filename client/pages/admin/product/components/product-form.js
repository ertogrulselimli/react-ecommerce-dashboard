import React from "react";
import {TabContent, TabPane} from "reactstrap";
import {injectIntl, defineMessages} from "react-intl";
import {Formik} from "formik";
import * as yup from "yup";
import ProductAttributes from "./product-attributes";
import FormNavLinks from "../../../../components/form-elements/form-nav-links";

import ProductFormTabMainInformations from "./form/product-form-tab-main-informations";
import ProductFormTabConfigurations from "./form/product-form-tab-configurations";
import ProductFormTabOrder from "./form/product-form-tab-order";
import ProductFormImageUpload from "./form/product-form-image-upload";
import ProductArticulesIndex from "./articules/product-articules-index";
import ProductBarcodesIndex from "./barcodes/product-barcodes-index";


import DefaultSelectOptions from "../context/default-select-options";


const navLinks = defineMessages({
    main: {
        id: "product.form.link.main_information",
        defaultMessage: "Əsas məlumatlar"
    },
    localization: {
        id: "production.form.link.localization",
        defaultMessage: "Localization"
    },
    configuration: {
        id: "production.form.link.configuration",
        defaultMessage: "Configuration"
    },
    order: {
        id: "production.form.link.order",
        defaultMessage: "Order"
    },
    attributes: {
        id: "production.form.link.attributes",
        defaultMessage: "Attributes"
    },
    images: {
        id: "production.form.link.images",
        defaultMessage: "Images"
    },
    articules: {
        id: "production.form.link.articules",
        defaultMessage: "Articules"
    },
    barcodes: {
        id: "production.form.link.barcodes",
        defaultMessage: "Barcodes"
    }
});

class ProductTypeForm extends React.Component {
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
                },
                {
                    tab: "3",
                    title: props.intl.formatMessage(navLinks.configuration)
                },
                {
                    tab: "7",
                    title: props.intl.formatMessage(navLinks.articules)
                },
                {
                    tab: "8",
                    title: props.intl.formatMessage(navLinks.barcodes)
                },
                {
                    tab: "4",
                    title: props.intl.formatMessage(navLinks.order)
                },
                {
                    tab: "5",
                    title: props.intl.formatMessage(navLinks.attributes)
                },
                {
                    tab: "6",
                    title: props.intl.formatMessage(navLinks.images)
                }
            ]
        };

        this.validation = yup.object().shape({});
    }

    toggle(tab) {
        console.log(tab);
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
                    initialValues={{
                        availability: initalData.availability,
                        articules: initalData.articules || [],
                        brandId: initalData.brandId || "",
                        brandDescription: initalData.brandDescription || "",
                        barcodes: initalData.barCodes || [],
                        categoryId: initalData.categoryId || "",
                        categoryDescription: initalData.categoryDescription || "",
                        itemNameId: initalData.itemNameId || "",
                        depth: initalData.depth || 0,
                        hasWarranyPeriod: initalData.hasWarranyPeriod || false,
                        height: initalData.height || 0,
                        id: initalData.id || null,
                        installationRequired: initalData.installationRequired || false,
                        itemType: initalData.itemType || "GOOD",
                        itemNameDescription: initalData.itemNameDescription || "",
                        maxOrderQuantity: initalData.maxOrderQuantity || 0,
                        minOrderQuantity: initalData.minOrderQuantity || 0,
                        model: initalData.model || "",
                        productMedias: [],
                        showInTopSales: initalData.showInTopSales || false,
                        stepOrderQuantity: initalData.stepOrderQuantity || 0,
                        storageUnitId: initalData.storageUnitId || 0,
                        storageUnitDescription: initalData.storageUnitDescription || ' ',
                        volume: initalData.volume || 0,
                        volumeMeasurementId: initalData.volumeMeasurementId || 0,
                        volumeMeasurementDescription: initalData.volumeMeasurementDescription || ' ',
                        warrantyPeriod: initalData.warrantyPeriod || 0,
                        warrantyPeriodTerm: initalData.warrantyPeriodTerm || 0,
                        weight: initalData.weight || 0,
                        weightMeasurementId: initalData.weightMeasurementId || 0,
                        weightMeasurementDescription: initalData.weightMeasurementDescription || ' ',
                        width: initalData.width || 0,
                        widthHeightDepthMeasurementId: initalData.widthHeightDepthMeasurementId || 0,
                        whdMeasurementDescription: initalData.whdMeasurementDescription || ' '
                    }}
                    onSubmit={this.props.onSubmit}
                    validationSchema={this.validation}
                    validateOnBlur={false}
                    validateOnChange={false}
                    >
                    {
                        (props) =>{
                        console.log(props);
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
                                    <TabPane tabId="1" key={1}>
                                        <ProductFormTabMainInformations
                                            formik={props}

                                        />
                                    </TabPane>

                                    <TabPane tabId="2" key={2}>
                                        <div className="row mt-3">
                                            <div className="col-6"/>
                                        </div>
                                    </TabPane>

                                    <TabPane tabId="3">
                                        <ProductFormTabConfigurations
                                            formik={props}
                                            {...this.props}
                                        />
                                    </TabPane>

                                    <TabPane tabId="4">
                                        <ProductFormTabOrder formik={props} {...this.props} />
                                    </TabPane>

                                    <TabPane tabId="7">
                                        <ProductArticulesIndex
                                            categories={this.props.categories}
                                            formik={props}
                                            onChange={articules => {
                                                props.setFieldValue("articules", articules);
                                            }}
                                        />
                                    </TabPane>

                                    <TabPane tabId="8">
                                        <ProductBarcodesIndex
                                            categories={this.props.categories}
                                            formik={props}
                                            onChange={barcodes => {
                                                props.setFieldValue("barcodes", barcodes);
                                            }}
                                        />
                                    </TabPane>

                                    <TabPane tabId="5">
                                        <div className="row">
                                            <div className="col-12">
                                                <ProductAttributes
                                                    auth={this.props.auth}
                                                    productId={initalData.id}
                                                    onChange={this.props.onAttributesChange}
                                                    categoryId={props.values.categoryId}
                                                />
                                            </div>
                                        </div>
                                    </TabPane>

                                    <TabPane tabId="6">
                                        <ProductFormImageUpload
                                            files={initalData.productMedias}
                                            formik={props}
                                        />
                                    </TabPane>
                                </TabContent>
                                <button className="d-none" type="submit"/>
                            </form>
                        );
                    }}
                </Formik>
        );
    }
}

export default injectIntl(ProductTypeForm);
