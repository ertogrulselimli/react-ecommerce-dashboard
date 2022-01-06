/**
 * Created by Administrator on 4/7/2019.
 */

import React from 'react'
import {FormattedMessage} from "react-intl";
import classnames from "classnames";
import {SimpleSelectFilter} from '../../common/mx-common-table-filter-exports'
import {displayName} from "../../../../helpers";

export const columns=[
    {
        Header: (
            <FormattedMessage id="attribute.table.id" defaultMessage="ID" />
        ),
        accessor: "id",
        show:true,
        maxWidth: 100,
        filterable: false
    },
    {
        Header: (
            <FormattedMessage id="attribute.table.name" defaultMessage="Name" />
        ),
        accessor: "name",
        show:true,
        filterable: false,
        Cell: row => displayName(row.original.displayName)
    },
    {
        Header: (
            <FormattedMessage
                id="attribute.table.description"
                defaultMessage="Description"
            />
        ),
        accessor: "description",
        show:true,
        filterable: false
    },
    {
        Header: (
            <FormattedMessage id="attribute.table.type" defaultMessage="Type" />
        ),
        accessor: "type",
        show:true,
        filterable: false
    },
    {
        Header: (
            <FormattedMessage
                id="attributes.table.active"
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


export default columns;