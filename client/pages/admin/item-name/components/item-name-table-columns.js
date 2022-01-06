/**
 * Created by Administrator on 4/7/2019.
 * Modified by bizhe on 5/31/2019.
 */
import React from 'react'
import {FormattedMessage} from "react-intl";
import classnames from "classnames";
import {SimpleSelectFilter} from '../../common/mx-common-table-filter-exports';
import CommonPaginatedSelectInput from "../../common/mx-paginated-select-filter";
import { categoryFilterUrl } from "../../common/constants";


const CategoryFilterInput = props => (
    <CommonPaginatedSelectInput
        filterUrl={categoryFilterUrl}
        query={{
            sort: "id,desc"
        }}
        onChange={props.onChange}
        value={props.filter ? props.filter.value : null}
    />
);

export const itemNameColumns = [
    {
        Header: <FormattedMessage id="item_name.table.item_name_id" defaultMessage="Id"/>,
        accessor: "id",
        show: true,
        filterable: false
    },
    {
        Header: <FormattedMessage id="item_name.table.description" defaultMessage="Description"/>,
        accessor: "description",
        show: true,
        filterable: false
    },
    {
        Header: <FormattedMessage id="item_name.table.categoryDescription" defaultMessage="category "/>,
        accessor: "categoryId",
        show: true,
        Cell: row => row.original.categoryDescription,
        Filter: CategoryFilterInput
    },
    {
        Header: <FormattedMessage id="item_name.table.name_code_mapping" defaultMessage="Name code mapping"/>,
        accessor: "nameCodeMapping",
        show: true,
        filterable: false
    },
    {
        Header: <FormattedMessage id="item_name.table.name_desc_mapping" defaultMessage="Name description mapping"/>,
        accessor: "nameDescMapping",
        show: true,
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
        Filter: SimpleSelectFilter
    }
];

export default itemNameColumns;