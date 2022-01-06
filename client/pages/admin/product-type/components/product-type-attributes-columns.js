import React from 'react'
import {FormattedMessage} from "react-intl";
import classnames from "classnames";
import {SimpleSelectFilter} from '../../common/mx-common-table-filter-exports'
import {displayName} from "../../../../helpers";

export const productTypeAttributesColumns = [
    {
        Header: <FormattedMessage id="attribute.name" defaultMessage="Name"/>,
        accessor: "name",
        show: true,
        Cell: row => displayName(row.original.attribute.displayName)
    },
    {
        Header: <FormattedMessage id="producttype.attribute.table.rank" defaultMessage="Rank"/>,
        accessor: "rank",
        show: true,
        maxWidth: 100,
    },
    {
        Header: <FormattedMessage id="producttype.attribute.table.mandatory" defaultMessage="Mandatory"/>,
        accessor: "mandatory",
        filterable: false,
        show: true,
        maxWidth: 100,
        Cell: row => <div className="text-center"><ValueIcon value={row.original.mandatory}/></div>
    },
    {
        Header: <FormattedMessage id="producttype.attribute.table.show_in_filter"
                                  defaultMessage="Show in filter"/>,
        accessor: "showInFilters",
        filterable: false,
        show: true,
        maxWidth: 100,
        Cell: row => <div className="text-center"><ValueIcon value={row.original.showInFilters}/></div>
    },
    {
        Header: (
            <FormattedMessage
                id="producttype.attribute.table.active"
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

export default productTypeAttributesColumns;