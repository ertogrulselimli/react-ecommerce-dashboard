import React from 'react'
import {FormattedMessage} from 'react-intl';
import {displayName} from '../../../../helpers/';
import classnames from 'classnames';
import SelectFilter from "../../../../components/react-table/select-filter";
import CategoryFilterInput from '../../catalog/components/category-filter-input'

export default function (props) {


    return (

        <PaginatedTable
            {...props}
            columns={[
                {
                    Header: <FormattedMessage id="item_name.table.item_name_id" defaultMessage="Id"/>,
                    accessor: "id",
                    filterable:false
                },
                {
                    Header: <FormattedMessage id="item_name.table.description" defaultMessage="Description"/>,
                    accessor: "description",
                    filterable:false
                },
                {
                    Header: <FormattedMessage id="item_name.table.categoryDescription" defaultMessage="category "/>,
                    accessor: "categoryId",
                    Cell: row => row.original.categoryDescription,
                    Filter: props => <CategoryFilterInput
                        filter={{active:'YES'}}
                        onChange={props.onChange}
                        value={props.filter ? props.filter.value : null}
                    />,
                },
                {
                    Header: <FormattedMessage id="item_name.table.name_code_mapping" defaultMessage="Name code mapping"/>,
                    accessor: "nameCodeMapping",
                    filterable:false
                },
                {
                    Header: <FormattedMessage id="item_name.table.name_desc_mapping" defaultMessage="Name description mapping"/>,
                    accessor: "nameDescMapping",
                    filterable:false
                },
                {
                    Header: (
                        <FormattedMessage
                            id="item_name.table.active"
                            defaultMessage="Active"
                        />
                    ),
                    accessor: "active",
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
                    Filter: props => (
                        <SelectFilter
                            {...props}
                            options={[
                                { value: "YES", label: "yes" },
                                { value: "NO", label: "no" },
                                { value: "ALL", label: "all" }
                            ]}
                        />
                    )
                }
            ]}
        />
    )
}