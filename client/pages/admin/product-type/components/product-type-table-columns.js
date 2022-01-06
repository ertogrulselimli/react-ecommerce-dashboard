/**
 * Created by Administrator on 4/7/2019.
 */
import React from 'react'
import {FormattedMessage} from "react-intl";
import classnames from "classnames";
import {SimpleSelectFilter} from '../../common/mx-common-table-filter-exports'

export const productTypeColumns=[
    {
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
    }
]

export default productTypeColumns;