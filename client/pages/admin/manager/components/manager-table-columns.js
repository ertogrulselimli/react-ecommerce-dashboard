/**
 * Created by Administrator on 4/7/2019.
 */
import React from 'react'
import {FormattedMessage} from "react-intl";
import classnames from "classnames";
import {SimpleSelectFilter} from '../../common/mx-common-table-filter-exports'

export const columns=[
    {
        Header: (
            <FormattedMessage id="firstname" defaultMessage="Firstname" />
        ),
        accessor: "firstname",
        show:true,
        filterable: false
    },
    {
        Header: <FormattedMessage id="lastname" defaultMessage="Lastname" />,
        accessor: "lastname",
        show:true,
        filterable: false
    },
    {
        Header: <FormattedMessage id="email" defaultMessage="Email" />,
        accessor: "email",
        show:true,
        filterable: false
    },
    {
        Header: (
            <FormattedMessage id="company_name" defaultMessage="Company name" />
        ),
        accessor: "companyName1",
        show:true,
        filterable: false
    },
    {
        Header: (
            <FormattedMessage
                id="brands.table.active"
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