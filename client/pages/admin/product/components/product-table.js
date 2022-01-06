import React from 'react'
import ReactTable from "../../../../components/react-table/react-table-intl";
import SelectFilter from "../../../../components/react-table/select-filter";
import {FormattedMessage} from 'react-intl';
import {displayName} from '../../../../helpers'
import classnames from 'classnames';
import CommonSelectInput from '../../common/common-entity-select-input'


const brandFilterUrl = 'brands/brand/filtered/';
const categoryFilterUrl = 'catalog/categories/filtered/';
const itemNameFilterUrl = 'catalog/item-name/filtered/';

export default function (props) {

    return (
        <div className={classnames({'d-none': !props.show})}>
            <ReactTable
                minRows={1}
                loading={props.loading}
                data={props.list}
                columns={[
                    {
                        Header: <FormattedMessage id="category.table.item_name" defaultMessage="Item name"/>,
                        accessor: "itemName",
                        width: 300,
                        style: {overflow: 'visible'},
                        headerStyle: {overflow: 'visible'},
                        Cell: row => displayName(row.original.itemNameDisplayName),
                        Filter: props => <CommonSelectInput
                            pageSize={10}
                            query={{
                                sort: 'id,desc'
                            }}
                            filterUrl={itemNameFilterUrl}
                            onChange={props.onChange}
                            value={props.filter ? props.filter.value : null}
                        />
                    },
                    {
                        Header: <FormattedMessage id="category.table.category" defaultMessage="Category"/>,
                        accessor: "categoryId",
                        width: 300,
                        style: {overflow: 'visible'},
                        headerStyle: {overflow: 'visible'},
                        Cell: row => displayName(row.original.categoryDisplayName),
                        Filter: props => <CommonSelectInput
                            pageSize={10}
                            query={{
                                sort: 'id,desc'
                            }}
                            filterUrl={categoryFilterUrl}
                            onChange={props.onChange}
                            value={props.filter ? props.filter.value : null}
                        />,

                    },
                    {
                        Header: <FormattedMessage id="category.table.brand" defaultMessage="Brand name"/>,
                        accessor: "brandId",
                        style: {overflow: 'visible'},
                        headerStyle: {overflow: 'visible'},
                        Cell: row => displayName(row.original.brandDisplayName),
                        Filter: props => <CommonSelectInput
                            pageSize={10}
                            query={{
                                sort: 'id,desc'
                            }}
                            filterUrl={brandFilterUrl}
                            onChange={props.onChange}
                            value={props.filter ? props.filter.value : null}
                        />,

                    },
                    {
                        Header: <FormattedMessage id="category.table.brought_out_of_assortment"
                                                  defaultMessage="Brought Out Of Assortment"/>,
                        accessor: "broughtOutOfAssortment",
                        style: {overflow: 'visible'},
                        headerStyle: {overflow: 'visible'},
                        Cell: row => row.original.broughtOutOfAssortment ? "Yes" : "No",
                        Filter: props => <SelectFilter {...props} options={[
                            {value: 'YES', label: 'yes'},
                            {value: "NO", label: 'no'},
                        ]}/>

                    },
                    {
                        Header: <FormattedMessage id="category.table.articule_number"
                                                  defaultMessage="Articule Number"/>,
                        accessor: "articuleNumber",
                        filterable: false
                    },
                    {
                        Header: <FormattedMessage id="category.table.barcode" defaultMessage="Barcode"/>,
                        accessor: "barCode",
                        filterable: false
                    },
                    {
                        Header: <FormattedMessage id="category.table.description" defaultMessage="Description"/>,
                        accessor: "description",
                        filterable: false
                    }

                ]}
                manual
                filterable
                defaultPageSize={10}
                pageSizeOptions={[1, 5, 10, 20, 25, 50, 100]}
                className="-striped"
                filtered={props.filtered}
                onFilteredChange={props.onFilteredChange}
                pages={props.pages}
                onFetchData={props.onFetchData}
                getTrProps={(state, rowInfo) => {
                    if (rowInfo && rowInfo.row) {
                        return {
                            onClick: props.onClickRow.bind(this, rowInfo),
                            className: classnames(
                                {
                                    'row-selected': rowInfo.index === props.selectedIndex,
                                }
                            ),
                        }
                    } else {
                        return {}
                    }
                }}
            />
        </div>
    )
}