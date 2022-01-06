import React from "react";
import { defineMessages } from "react-intl";
import Loadable from "react-loadable";
import CenterCircularProgress from "../../components/ui-elements/center-circular-progress";

const LoadingComponent = props => (
  <CenterCircularProgress show="true" portal size={60} delay={200} />
);

const messages = defineMessages({
  dashboard: {
    id: "sidenav.dashboard",
    defaultMessage: "Dashboard"
  },
  masterCatalog: {
    id: "sidenav.master_catalog",
    defaultMessage: "Master Catalog"
  },
  masterCatalogCategories: {
    id: "sidenav.master_catalog.categories",
    defaultMessage: "Categories"
  },
  itemName: {
    id: "sidenav.master_catalog.item_name",
    defaultMessage: "Item name"
  },
  topSales: {
    id: "sidenav.master_catalog.top_sales",
    defaultMessage: "Top sales"
  },
  itemMapping: {
    id: "sidenav.master_catalog.item_mapping",
    defaultMessage: "Item mapping"
  },
  masterCatalogProducts: {
    id: "sidenav.master_catalog.products",
    defaultMessage: "Products"
  },
  masterCatalogProductTypes: {
    id: "sidenav.master_catalog.product_types",
    defaultMessage: "Product types"
  },
  masterCatalogBrands: {
    id: "sidenav.master_catalog.brands",
    defaultMessage: "Brands"
  },
  masterCatalogPriceList: {
    id: "sidenav.master_catalog.price_list",
    defaultMessage: "Price list"
  },
  masterDelivery: {
    id: "sidenav.master_delivery",
    defaultMessage: "Master delivery"
  },
  comissionByCategory: {
    id: "sidenav.master_catalog.comission_by_category",
    defaultMessage: "Comission by category"
  },
  masterDeliveryCity: {
    id: "sidenav.master_delivery.city",
    defaultMessage: "City"
  },
  manager: {
    id: "sidenav.manager",
    defaultMessage: "Manager"
  },
  shops: {
    id: "sidenav.shops",
    defaultMessage: "Shops"
  },
  attributes: {
    id: "sidenav.system.attributes",
    defaultMessage: "Attributes"
  },
  system: {
    id: "sidenav.system",
    defaultMessage: "System"
  },
  operations: {
    id: "sidenav.operations",
    defaultMessage: "Operations"
  },
  operationsImport: {
    id: "sidenav.operations.import",
    defaultMessage: "Import"
  },
  inventory: {
    id: "sidenav.inventory",
    defaultMessage: "Inventory"
  },
  unitOfMeasurement: {
    id: "sidenav.system.unit_of_measurement",
    defaultMessage: "Unit of measurement"
  },
  typeOfIncome: {
    id: "sidenav.system.type_of_income",
    defaultMessage: "Type of Income"
  },
  productApprove: {
    id: "sidenav.catalog.approve_products",
    defaultMessage: "Approve Products"
  },
  otherIncome: {
    id: "sidenav.system.other_income",
    defaultMessage: "Other Income"
  },
  articulesAndBarcodes: {
    id: "sidenav.system.articuleandbarcode",
    defaultMessage: "Articules And Barcodes"
  },
  excelItemMappingIndex: {
    id: "sidenav.operations.excel_items_mapping",
    defaultMessage: "Excel items mapping"
  },
  excelItemMappingApproveIndex: {
    id: "sidenav.operations.excel_items_mapping_approve",
    defaultMessage: "Approve mapped items"
  }
});

let tabs = {
  dashboard: {
    title: messages.dashboard,
    component: Loadable({
      loader: () => import("./main/dashboard-index"),
      loading: LoadingComponent
    })
  },
  category: {
    title: messages.masterCatalogCategories,
    component: Loadable({
      loader: () => import("./catalog/category-index"),
      loading: LoadingComponent
    })
  },
  manager: {
    title: messages.manager,
    component: Loadable({
      loader: () => import("./manager/manager-index"),
      loading: LoadingComponent
    })
  },
  itemName: {
    title: messages.itemName,
    component: Loadable({
      loader: () => import("./item-name/item-name-index"),
      loading: LoadingComponent
    })
  },
  topSales: {
    title: messages.topSales,
    component: Loadable({
      loader: () => import("./top-sales/top-sales-index"),
      loading: LoadingComponent
    })
  },
  itemMapping: {
    title: messages.itemMapping,
    component: Loadable({
      loader: () => import("./item-mapping/item-mapping-index"),
      loading: LoadingComponent
    })
  },
  shop: {
    title: messages.shops,
    component: Loadable({
      loader: () => import("./shop/shop-index"),
      loading: LoadingComponent
    })
  },
  inventory: {
    title: messages.inventory,
    component: Loadable({
      loader: () => import("./inventory/inventory-index"),
      loading: LoadingComponent
    })
  },
  attribute: {
    title: messages.attributes,
    component: Loadable({
      loader: () => import("./attribute/attribute-index"),
      loading: LoadingComponent
    })
  },
  productType: {
    title: messages.masterCatalogProductTypes,
    component: Loadable({
      loader: () => import("./product-type/product-type-index"),
      loading: LoadingComponent
    })
  },
  brand: {
    title: messages.masterCatalogBrands,
    component: Loadable({
      loader: () => import("./brands/brands-index"),
      loading: LoadingComponent
    })
  },
  unitOfMeasurement: {
    title: messages.unitOfMeasurement,
    component: Loadable({
      loader: () => import("./unit-of-measurement/unit-of-measurement-index"),
      loading: LoadingComponent
    })
  },
  typeOfIncome: {
    title: messages.typeOfIncome,
    component: Loadable({
      loader: () => import("./type-of-income/type-of-income-index"),
      loading: LoadingComponent
    })
  },
  otherIncome: {
    title: messages.otherIncome,
    component: Loadable({
      loader: () => import("./other-income/other-income-index"),
      loading: LoadingComponent
    })
  },
  product: {
    title: messages.masterCatalogProducts,
    component: Loadable({
      loader: () => import("./product/product-index"),
      loading: LoadingComponent
    })
  },
  productApprove: {
    title: messages.productApprove,
    component: Loadable({
      loader: () => import("./product/product-approve-index"),
      loading: LoadingComponent
    })
  },
  importIndex: {
    title: messages.operationsImport,
    component: Loadable({
      loader: () => import("./import/import-index"),
      loading: LoadingComponent
    })
  },
  city: {
    title: messages.masterDeliveryCity,
    component: Loadable({
      loader: () => import("./delivery/city-index"),
      loading: LoadingComponent
    })
  },
  priceList: {
    title: messages.masterCatalogPriceList,
    component: Loadable({
      loader: () => import("./price-list/price-list-index"),
      loading: LoadingComponent
    })
  },
  comissionByCategory: {
    title: messages.comissionByCategory,
    component: Loadable({
      loader: () => import("./comission-by-category/comission-index"),
      loading: LoadingComponent
    })
  },
  articuleandbarcode: {
    title: messages.articulesAndBarcodes,
    component: Loadable({
      loader: () => import("./articuleandbarcode/articuleandbarcode-index"),
      loading: LoadingComponent
    })
  },
  ExcelItemMappingIndex: {
    title: messages.excelItemMappingIndex,
    component: Loadable({
      loader: () => import("./excel-item-mapping/excel-item-mapping-index"),
      loading: LoadingComponent
    })
  },
  ExcelItemMappingApproveIndex: {
    title: messages.excelItemMappingApproveIndex,
    component: Loadable({
      loader: () =>
        import("./excel-item-mapping/excel-item-mapping-approve-index"),
      loading: LoadingComponent
    })
  }
};

const navigations = [
  {
    name: messages.dashboard,
    url: "/dashboard/index",
    icon: "fa fa-th-large",
    component: "dashboard"
  },
  {
    name: messages.masterCatalog,
    icon: "fa fa-database",
    children: [
      {
        name: messages.masterCatalogCategories,
        url: "/dashboard/categories",
        icon: "icon-star",
        component: "category"
      },
      {
        name: messages.productApprove,
        url: "/dashboard/approve-products",
        icon: "icon-star",
        component: "productApprove"
      },
      {
        name: messages.masterCatalogProducts,
        url: "/dashboard/products",
        icon: "icon-star",
        component: "product"
      },
      {
        name: messages.masterCatalogBrands,
        url: "/dashboard/brands",
        component: "brand"
      },
      {
        name: messages.masterCatalogPriceList,
        url: "/dashboard/pricelist",
        component: "priceList"
      },
      {
        name: messages.itemName,
        url: "/dashboard/item-name",
        component: "itemName"
      },
      {
        name: messages.topSales,
        url: "/dashboard/top-sales",
        component: "topSales"
      },
      {
        name: messages.itemMapping,
        url: "/dashboard/item-mapping",
        component: "itemMapping"
      },
      {
        name: messages.comissionByCategory,
        url: "/dashboard/comission-by-category",
        component: "comissionByCategory"
      },
      {
        name: messages.masterCatalogProductTypes,
        url: "/dashboard/product-types",
        component: "productType"
      },
      {
        name: messages.attributes,
        url: "/dashboard/attributes",
        component: "attribute"
      },
      {
        name: messages.unitOfMeasurement,
        url: "/dashboard/unit-of-measurement",
        component: "unitOfMeasurement",
        roles: ["ROLE_SUPERADMIN"]
      }
    ]
  },
  {
    name: messages.masterDelivery,
    icon: "fa fa-location-arrow",
    children: [
      {
        name: messages.masterDeliveryCity,
        url: "/dashboard/city",
        icon: "icon-star",
        component: "city"
      }
    ]
  },
  {
    name: messages.manager,
    icon: "fa fa-user",
    url: "/dashboard/managers",
    component: "manager"
  },
  {
    name: messages.shops,
    icon: "fa fa-home",
    url: "/dashboard/shops",
    component: "shop"
  },
  {
    name: messages.inventory,
    icon: "fa fa-archive",
    url: "/dashboard/inventory",
    component: "inventory"
  },
  {
    name: messages.system,
    icon: "fa fa-cogs",
    children: [
      {
        name: messages.typeOfIncome,
        url: "/dashboard/type-of-income",
        icon: "fa fa-money",
        component: "typeOfIncome",
        roles: ["ROLE_SUPERADMIN"]
      },
      {
        name: messages.otherIncome,
        url: "/dashboard/other-income",
        icon: "fa fa-folder-open",
        component: "otherIncome",
        roles: ["ROLE_SUPERADMIN"]
      },
      {
        name: messages.articulesAndBarcodes,
        url: "/dashboard/articuleandbarcode",
        icon: "fa fa-list",
        component: "articuleandbarcode",
        roles: ["ROLE_SUPERADMIN"]
      }
    ]
  },
  {
    name: messages.operations,
    icon: "fa fa-tasks",
    children: [
      {
        name: messages.operationsImport,
        url: "/dashboard/import",
        component: "importIndex",
        icon: "fa fa-upload"
      },
      {
        name: messages.excelItemMappingIndex,
        url: "/dashboard/excel-item-mapping",
        component: "ExcelItemMappingIndex",
        icon: "fa fa-file-o"
      },
      {
        name: messages.excelItemMappingApproveIndex,
        url: "/dashboard/excel-item-mapping-approve",
        component: "ExcelItemMappingApproveIndex",
        icon: "fa fa-file-o",
        roles: ["ROLE_SUPERADMIN"]
      }
    ]
  }
];

const getNavigation = role => {
  let returnData = { items: [] };
  navigations.map(navigation => {
    if (navigation.roles && navigation.roles.includes(role)) {
      returnData.items.push(navigation);
    } else if (navigation.children) {
      let filteredChildren = [];
      navigation.children.map(children => {
        if (!children.roles) filteredChildren.push(children);
        if (children.roles && children.roles.includes(role)) {
          filteredChildren.push(children);
        }
      });
      if (filteredChildren.length) {
        navigation.children = filteredChildren;
        returnData.items.push(navigation);
      }
    } else {
      returnData.items.push(navigation);
    }
  });

  return returnData;
};

export { tabs };
export default getNavigation;
