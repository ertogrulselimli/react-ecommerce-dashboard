/**
 * Created by Administrator on 4/22/2019.
 */

import React from 'react'
import {SimpleSelectFilter, SimpleTextInput, SimpleNumberInput} from './mx-common-table-filter-exports'
import {FormattedMessage} from "react-intl"
import classnames from "classnames";


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
            <FormattedMessage
                id="category.table.concrete"
                defaultMessage="Concrete"
            />
        ),
        show: true,
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