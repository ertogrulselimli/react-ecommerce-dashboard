/**
 * Created by Administrator on 4/10/2019.
 */

import React from "react";
import {FormattedMessage} from "react-intl";
import {displayName} from "../../../helpers";
import classnames from "classnames";
import {SimpleSelectFilter, SimpleTextInput, SimpleNumberInput} from './mx-common-table-filter-exports'
import CommonSelectInput from './common-entity-select-input'


const categoryFilterUrl = 'catalog/categories/filtered/';

const CategoryFilterInput = props => <CommonSelectInput
    filterUrl={categoryFilterUrl}
    pageSize={10}
    query={{
        sort: 'id,desc'
    }}
    onChange={props.onChange}
    value={props.filter ? props.filter.value : null}
/>


export const brandTableColumns = [
    {
        Header: (
            <FormattedMessage
                id="brands.table.id"
                defaultMessage="Brand id"
            />
        ),
        accessor: "id",
        filterable: false,
        show: true
    },
    {
        Header: (
            <FormattedMessage
                id="brands.table.description"
                defaultMessage="Description"
            />
        ),
        accessor: "description",
        filterable: false,
        show: true
    },
    {
        Header: (
            <FormattedMessage
                id="brands.table.brand_code_mapping_id"
                defaultMessage="Brand Code Mapping Id"
            />
        ),
        accessor: "brandCodeMapping",
        filterable: false,
        show: true
    },
    {
        Header: (
            <FormattedMessage
                id="brands.table.brand_description_mapping"
                defaultMessage="Brand Description Mapping"
            />
        ),
        accessor: "brandDescriptionMapping",
        filterable: false,
        show: true
    },
    {
        Header: (
            <FormattedMessage
                id="brands.table.active"
                defaultMessage="Active"
            />
        ),
        accessor: "active",
        show: true,
        style: {overflow: "visible"},
        headerStyle: {overflow: "visible"},
        Cell: row => (
            <i
                className={classnames([
                    "fa",
                    {
                        "fa-check text-success": row.original.active,
                        "fa-times text-danger": !row.original.active
                    }
                ])}
            />
        ),
        Filter: SimpleSelectFilter
    }
];

export const itemNameTableColumns = [
    {
        Header: <FormattedMessage id="item_name.table.item_name_id" defaultMessage="Id"/>,
        accessor: "id",
        show: true,
        filterable: false
    },
    {
        Header: <FormattedMessage id="item_name.table.description" defaultMessage="Description"/>,
        accessor: "description",
        show: true,
        filterable: false
    },
    {
        Header: <FormattedMessage id="item_name.table.categoryDescription" defaultMessage="category "/>,
        accessor: "categoryId",
        show: true,
        Cell: row => row.original.categoryDescription,
        Filter: CategoryFilterInput
    },
    {
        Header: <FormattedMessage id="item_name.table.name_code_mapping" defaultMessage="Name code mapping"/>,
        accessor: "nameCodeMapping",
        show: true,
        filterable: false
    },
    {
        Header: <FormattedMessage id="item_name.table.name_desc_mapping" defaultMessage="Name description mapping"/>,
        accessor: "nameDescMapping",
        show: true,
        filterable: false
    },
    {
        Header: (
            <FormattedMessage
                id="item_name.table.active"
                defaultMessage="Active"
            />
        ),
        accessor: "active",
        show: true,
        style: {overflow: "visible"},
        headerStyle: {overflow: "visible"},
        Cell: row => (
            <i
                className={classnames([
                    "fa",
                    {
                        "fa-check text-success": row.original.active,
                        "fa-times text-danger": !row.original.active
                    }
                ])}
            />
        ),
        Filter: SimpleSelectFilter
    }
];

export const categoryTableColumns = [
    {
        Header: (
            <FormattedMessage id="category.table.id" defaultMessage="ID"/>
        ),
        accessor: "id",
        filterable: false,
        show: true,
        Cell: (row) => {
            return row.original.id
        }
    },
    {
        Header: (
            <FormattedMessage id="category.table.code" defaultMessage="Code"/>
        ),
        accessor: "code",
        style: {overflow: 'visible'},
        headerStyle: {overflow: 'visible'},
        Filter: SimpleTextInput,
        show: true
    },
    {
        Header: (
            <FormattedMessage
                id="category.table.category-level"
                defaultMessage="Category Level"
            />
        ),
        accessor: "categoryLevel",
        style: {overflow: 'visible'},
        headerStyle: {overflow: 'visible'},
        Filter: SimpleNumberInput,
        show: true
    },
    {
        Header: (
            <FormattedMessage
                id="category.table.description"
                defaultMessage="Description"
            />
        ),
        accessor: "description",
        filterable: false,
        show: true
    },
    {
        Header: (
            <FormattedMessage id="category.table.root" defaultMessage="Root"/>
        ),
        show: false,
        accessor: "root",
        style: {overflow: "visible"},
        headerStyle: {overflow: "visible"},
        Cell: row => (
            <i
                className={classnames([
                    "fa",
                    {
                        "fa-check text-success": row.original.root,
                        "fa-times text-danger": !row.original.root
                    }
                ])}
            />
        ),
        Filter: SimpleSelectFilter
    },
    {
        Header: (
            <FormattedMessage
                id="category.table.concrete"
                defaultMessage="Concrete"
            />
        ),
        show: false,
        accessor: "concrete",
        style: {overflow: "visible"},
        headerStyle: {overflow: "visible"},
        Cell: row => (
            <i
                className={classnames([
                    "fa",
                    {
                        "fa-check text-success": row.original.concrete,
                        "fa-times text-danger": !row.original.concrete
                    }
                ])}
            />
        ),
        Filter: SimpleSelectFilter
    },
    {
        Header: (
            <FormattedMessage
                id="category.table.parentId"
                defaultMessage="Parent Id"
            />
        ),
        show: false,
        accessor: "parentId",
        filterable: false
    },
    {
        Header: (
            <FormattedMessage
                id="category.table.parentCode"
                defaultMessage="Parent Code"
            />
        ),
        show: true,
        accessor: "parentCode",
        style: {overflow: 'visible'},
        headerStyle: {overflow: 'visible'},
        Filter: SimpleTextInput
    },
    {
        Header: (
            <FormattedMessage id="category.table.name" defaultMessage="Name"/>
        ),
        accessor: "name",
        Cell: row => displayName(row.original.displayName),
        filterable: false,
        show: false
    },
    {
        Header: (
            <FormattedMessage
                id="item_name.table.active"
                defaultMessage="Active"
            />
        ),
        show: true,
        accessor: "active",
        style: {overflow: "visible"},
        headerStyle: {overflow: "visible"},
        Cell: row => (
            <i
                className={classnames([
                    "fa",
                    {
                        "fa-check text-success": row.original.active,
                        "fa-times text-danger": !row.original.active
                    }
                ])}
            />
        ),
        Filter: SimpleSelectFilter
    }
]


export const  unitOfMeasurementTableColumns=[
    {
        Header: (
            <FormattedMessage id="unit_of_measurement.id" defaultMessage="Id" />
        ),
        accessor: "id",
        show:true,
        filterable: false
    },
    {
        Header: (
            <FormattedMessage
                id="unit_of_measurement.table.name"
                defaultMessage="Display Name"
            />
        ),
        accessor: "name",
        show:true,
        filterable: false,
        Cell: row => displayName(row.original.displayName)
    },
    {
        Header: (
            <FormattedMessage
                id="unit_of_measurement.table.description"
                defaultMessage="description"
            />
        ),
        accessor: "description",
        show:true,
        filterable: false
    },
    {
        Header: (
            <FormattedMessage
                id="unit_of_measurement.table.active"
                defaultMessage="Active"
            />
        ),
        accessor: "active",
        show:true,
        style: { overflow: "visible" },
        headerStyle: { overflow: "visible" },
        Cell: row => (
            <i
                className={classnames([
                    "fa",
                    {
                        "fa-check text-success": row.original.active,
                        "fa-times text-danger": !row.original.active
                    }
                ])}
            />
        ),
        Filter:SimpleSelectFilter
    }
];


export const productTypeTableColumns=[{
    Header: (
        <FormattedMessage
            id="product_type.table.id"
            defaultMessage="Product Type Id"
        />
    ),
    accessor: "id",
    show:true,
    filterable: false
},
    {
        Header: (
            <FormattedMessage
                id="product_type.table.description"
                defaultMessage="Description"
            />
        ),
        accessor: "description",
        show:true,
        filterable: false
    },
    {
        Header: (
            <FormattedMessage
                id="product_type.table.active"
                defaultMessage="Active"
            />
        ),
        accessor: "active",
        show:true,
        style: { overflow: "visible" },
        headerStyle: { overflow: "visible" },
        Cell: row => (
            <i
                className={classnames([
                    "fa",
                    {
                        "fa-check text-success": row.original.active,
                        "fa-times text-danger": !row.original.active
                    }
                ])}
            />
        ),
        Filter:SimpleSelectFilter
    }];






