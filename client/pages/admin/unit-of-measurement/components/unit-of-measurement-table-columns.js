/**
 * Created by Administrator on 4/7/2019.
 */
import React from "react";
import {FormattedMessage} from "react-intl";
import classnames from "classnames";
import {displayName} from "../../../../helpers";
import {SimpleSelectFilter} from '../../common/mx-common-table-filter-exports'


const columns=[
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



export default columns


