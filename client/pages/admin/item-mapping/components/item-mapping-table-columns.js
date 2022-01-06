/**
 * Created by Administrator on 4/15/2019.
 */

import React from "react";
import {FormattedMessage} from "react-intl";
import classnames from "classnames";
import {SimpleSelectFilter} from '../../common/mx-common-table-filter-exports'

const itemMappingTableColumns=[
    {
        Header: <FormattedMessage id="item_mapping.table.articul_number"
                                  defaultMessage="Articul Number"/>,
        accessor: "articulNumber"
    },
    {
        Header: <FormattedMessage id="item_mapping.table.barcode" defaultMessage="Barcode"/>,
        accessor: "barCode",
        Cell: row => row.original.barCode.map((b, k) => <div key={k}>{b}</div>)
    },
    {
        Header: <FormattedMessage id="item_mapping.table.category_description"
                                  defaultMessage="Category Description"/>,
        accessor: "categoryDescription"
    },
    {
        Header: <FormattedMessage id="item_mapping.table.item_name_description"
                                  defaultMessage="Item Name Description"/>,
        accessor: "itemNameDescription"
    },
    {
        Header: <FormattedMessage id="item_mapping.table.shop_description"
                                  defaultMessage="Shop Description"/>,
        accessor: "shopDescription"
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
        Filter: SimpleSelectFilter
    }
]

export default itemMappingTableColumns