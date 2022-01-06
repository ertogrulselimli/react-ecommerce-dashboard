/**
 * Created by Administrator on 4/7/2019.
 */
import React from 'react'
import {FormattedMessage} from "react-intl";
import classnames from "classnames";
import {SimpleSelectFilter} from '../../common/mx-common-table-filter-exports'

export const shopColumns = [{
    Header: <FormattedMessage id="shop.table.id" defaultMessage="Id"/>,
    accessor: "id",
    filterable: false
},
    {
        Header: (
            <FormattedMessage
                id="shop.table.description"
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
                id="shop.table.partnerType"
                defaultMessage="Type"
            />
        ),
        accessor: "type",
        show:true,
        filterable: false
    },
    {
        Header: (
            <FormattedMessage
                id="shop.table.comission"
                defaultMessage="comission"
            />
        ),
        accessor: "comission",
        show:true,
        filterable: false
    },
    {
        Header: (
            <FormattedMessage
                id="shop.table.displayGoodsOnSeperateCard"
                defaultMessage="Display Goods on seperate Card"
            />
        ),
        accessor: "displayGoodsOnSeperateCard",
        show:true,
        filterable: false,
        style: {overflow: "visible"},
        headerStyle: {overflow: "visible"},
        Cell: row => (row.original.displayGoodsOnSeperateCard ? "Yes" : "No")
    },
    {
        Header: (
            <FormattedMessage id="shop.table.active" defaultMessage="Active"/>
        ),
        accessor: "active",
        show:true,
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
    }]


export default shopColumns;