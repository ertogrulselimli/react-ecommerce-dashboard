/**
 * Created by Administrator on 4/7/2019.
 */
import React from "react";
import {FormattedMessage} from "react-intl";
import classnames from "classnames";
import {SimpleSelectFilter} from '../../common/mx-common-table-filter-exports'



const brandColumns=[
    {
        Header:  (
            <FormattedMessage
                id="brands.table.id"
                defaultMessage="Brand id"
            />
        ),
        accessor: "id",
        filterable: false,
        show:true
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
        show:true
    },
    {
        Header:  (
            <FormattedMessage
                id="brands.table.brand_code_mapping_id"
                defaultMessage="Brand Code Mapping Id"
            />
        ),
        accessor: "brandCodeMapping",
        filterable: false,
        show:true
    },
    {
        Header:(
            <FormattedMessage
                id="brands.table.brand_description_mapping"
                defaultMessage="Brand Description Mapping"
            />
        ),
        accessor: "brandDescriptionMapping",
        filterable: false,
        show:true
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
];



export default brandColumns