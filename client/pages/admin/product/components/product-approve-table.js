import React from 'react'
// Import React Table
import ReactTable from "../../../../components/react-table/react-table-intl";
import {FormattedMessage} from 'react-intl';
import {displayName} from '../../../../helpers'
import classnames from 'classnames';
import moment from 'moment'
import CategoryFilterInput, {dataToSelectOptions as categoryDataToSelectOptions} from '../../catalog/components/category-filter-input'
import BrandSelectInput, {dataToSelectOptions as brandDataToSelectOptions} from '../../brands/components/brand-select-input'
import ItemNameSelectInput, {dataToSelectOptions as itemDataToSelectOptions} from "../../item-name/components/item-name-select-input";
import SelectFilter from "../../../../components/react-table/select-filter";



export default function (props) {

    return (


        <div className={classnames({'d-none': !props.show})}>
            <ReactTable
                minRows={1}
                sortable={false}
                loading={props.loading}
                data={props.list}
                columns={[
                    {
                        Header: <FormattedMessage id="product_approve.table.item_name" defaultMessage="Item name"/>,
                        width: 300,
                        accessor: "itemNameId",
                        show: props.showColumns.itemName,
                        style: {overflow: 'visible'},
                        headerStyle: {overflow: 'visible'},
                        Cell: row => displayName(row.original.itemNameDisplayName),
                        Filter: filterProps => (
                            <ItemNameSelectInput
                                defaultOptions={itemDataToSelectOptions(props.defaultFilterOptions.itemNames)}
                                onChange={filterProps.onChange}
                                value={filterProps.filter ? filterProps.filter.value : null}
                            />
                        )
                    },
                    {
                        Header: <FormattedMessage id="product_approve.table.category" defaultMessage="Category"/>,
                        accessor: "categoryId",
                        width: 300,
                        show: props.showColumns.category,
                        style: {overflow: 'visible'},
                        headerStyle: {overflow: 'visible'},
                        Cell: row => displayName(row.original.categoryDisplayName),
                        Filter: filterProps => <CategoryFilterInput
                            defaultOptions={categoryDataToSelectOptions(props.defaultFilterOptions.categories)}
                            onChange={filterProps.onChange}
                            value={filterProps.filter ? "" : null}
                        />,

                    },
                    {
                        Header: <FormattedMessage id="product_approve.table.brand" defaultMessage="Brand name"/>,
                        width: 250,
                        accessor: "brandId",
                        show: props.showColumns.brand,
                        style: {overflow: 'visible'},
                        headerStyle: {overflow: 'visible'},
                        Cell: row => displayName(row.original.brandDisplayName),
                        Filter: filterProps =>
                            <BrandSelectInput
                                defaultOptions={brandDataToSelectOptions(props.defaultFilterOptions.brands)}
                                active="ALL" onChange={filterProps.onChange}
                                value={filterProps.filter ? filterProps.filter.value : null}
                            />,

                    },
                    {
                        Header: <FormattedMessage id="product_approve.table.brought_out_of_assortment"
                                                  defaultMessage="Brought Out Of Assortment"/>,
                        width: 80,
                        filterable: false,
                        accessor: "broughtOutOfAssortment",
                        show: props.showColumns.broughtOutOfAssortment,
                        Cell: row => row.original.broughtOutOfAssortment ? "Yes" : "No"

                    },
                    {
                        Header: <FormattedMessage id="product_approve.table.created_by"
                                                  defaultMessage="Created by"/>,
                        minWidth: 150,
                        filterable: false,
                        show: props.showColumns.createdBy,
                        accessor: "createdBy",
                    },
                    {
                        Header: <FormattedMessage id="product_approve.table.created_date"
                                                  defaultMessage="Created Date"/>,
                        minWidth: 90,
                        filterable: false,
                        show: props.showColumns.createdDate,
                        accessor: "createdDate",
                        Cell: row => moment(row.original.createdDate).format('DD.MM.YYYY H:mm')
                    },
                    {
                        Header: <FormattedMessage id="product_approve.table.last_modified_by"
                                                  defaultMessage="Last Modified by"/>,
                        show: props.showColumns.lastModifiedBy,
                        filterable: false,
                        accessor: "lastModifiedBy",
                    },
                    {
                        Header: <FormattedMessage id="product_approve.table.last_modified_date"
                                                  defaultMessage="Last Modified date"/>,
                        minWidth: 90,
                        filterable: false,
                        show: props.showColumns.lastModifiedDate,
                        accessor: "lastModifiedDate",
                        Cell: row => moment(row.original.lastModifiedDate).format('DD.MM.YYYY H:mm')
                    },
                    {
                        Header: <FormattedMessage id="product_approve.table.model" defaultMessage="Model"/>,
                        filterable: false,
                        show: props.showColumns.model,
                        accessor: "model",
                    },
                    {
                        Header: <FormattedMessage id="product_approve.table.approved" defaultMessage="Approved"/>,
                        show: props.showColumns.approved,
                        accessor: "approved",
                        width: 150,
                        Cell: row => row.original.approved ? "Yes" : "No",
                        Filter: props => <SelectFilter {...props} options={[
                            {value: true, label: 'yes'},
                            {value: false, label: 'no'},
                        ]}/>
                    },
                    {
                        Header: <FormattedMessage id="product_approve.table.approved_by" defaultMessage="Approved By"/>,
                        filterable: false,
                        show: props.showColumns.approvedBy,
                        accessor: "approvedBy",
                    },
                    {
                        Header: <FormattedMessage id="product_approve.table.approved_date"
                                                  defaultMessage="Approved date"/>,
                        filterable: false,
                        minWidth: 90,
                        show: props.showColumns.approvedDate,
                        accessor: "approvedDate",
                        Cell: row => moment(row.original.approvedDate).format('DD.MM.YYYY H:mm')
                    },
                    {
                        Header: "",
                        filterable: false,
                        minWidth: 150,
                        accessor: "approvedDate",
                        Cell: row => (
                            <div>
                                <button
                                    onClick={() => props.edit(row.original)}
                                    className="btn btn-default btn-sm btn-circle ml-1">
                                    <i className="fa fa-info" />
                                </button>
                            </div>
                        )
                    }

                ]}
                manual
                filterable
                defaultPageSize={10}
                className="-striped"
                filtered={props.filtered}
                onFilteredChange={props.onFilteredChange}
                pages={props.pages}
                onFetchData={props.onFetchData}

            />
        </div>
    )
}