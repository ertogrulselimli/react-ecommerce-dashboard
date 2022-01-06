import React from "react";
import {FormattedMessage} from "react-intl";
import {displayName} from "../../../../helpers";
import classnames from "classnames";
import {SimpleSelectFilter,SimpleTextInput,SimpleNumberInput} from '../../common/mx-common-table-filter-exports'


export  const columns= [
    {
        Header: (
            <FormattedMessage id="category.table.id" defaultMessage="ID"/>
        ),
        accessor: "id",
        filterable: false,
        show:true,
        Cell: (row)=>{return row.original.id}
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
        show:false,
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
        show:false,
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
        show:false,
        accessor: "parentId",
        filterable: false,
    },
    {
        Header: (
            <FormattedMessage
                id="category.table.parentCode"
                defaultMessage="Parent Code"
            />
        ),
        show:true,
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
        show:false
    },
    {
        Header: (
            <FormattedMessage
                id="item_name.table.active"
                defaultMessage="Active"
            />
        ),
        show:true,
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


export default columns;