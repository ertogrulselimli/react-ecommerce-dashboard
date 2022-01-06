/**
 * Created by Administrator on 4/7/2019.
 */
import React from "react";
import {FormattedMessage} from "react-intl";
import classnames from "classnames";
import {displayName} from "../../../../helpers";
import {SimpleSelectFilter,SimpleTextInput,SimpleNumberInput} from '../../common/mx-common-table-filter-exports'
import CommonSelectInput from '../../common/common-entity-select-input'
import CommonPaginatedSelectInput from '../../common/mx-paginated-select-filter'

const brandFilterUrl='brands/brand/filtered/';
const categoryFilterUrl='catalog/categories/filtered/';
const itemNameFilterUrl= 'catalog/item-name/filtered/';


const BrandFilterInput =  props => <CommonPaginatedSelectInput
    filterUrl={brandFilterUrl}
    pageSize={5}
    query={{
        sort: 'id,desc'
    }}
    onChange={props.onChange}
    value={props.filter ? props.filter.value : null}
/>


const CategoryFilterInput =props => <CommonPaginatedSelectInput
    filterUrl={categoryFilterUrl}
    query={{
        sort: 'id,desc'
    }}
    onChange={props.onChange}
    value={props.filter ? props.filter.value : null}
/>


const ItemNameFilterInput = props => <CommonPaginatedSelectInput
    filterUrl={itemNameFilterUrl}
    query={{
        sort: 'id,desc'
    }}
    onChange={props.onChange}
    value={props.filter ? props.filter.value : null}
/>


export const columns=[
    {
        Header: (
            <FormattedMessage
                id="products.table.id"
                defaultMessage="Product id"
            />
        ),
        accessor: "id",
        filterable: false,
        show:true
    },
    {
        Header: <FormattedMessage id="category.table.item_name" defaultMessage="Item name"/>,
        accessor: "itemName",
        show:true,
      /*  style: {overflow: 'visible'},
        headerStyle: {overflow: 'visible'},*/
        Cell: row => row.original.description,
        Filter: ItemNameFilterInput
    },
    {
        Header: <FormattedMessage id="category.table.category" defaultMessage="Category"/>,
        accessor: "categoryId",
        show:true,
      /*  style: {overflow: 'visible'},
        headerStyle: {overflow: 'visible'},*/
        Cell: row => row.original.categoryDescription,
        Filter: CategoryFilterInput
    },
    {
        Header: <FormattedMessage id="category.table.brand" defaultMessage="Brand name"/>,
        accessor: "brandId",
        show:true,
      /*  style: {overflow: 'visible'},
        headerStyle: {overflow: 'visible'},*/
        Cell: row => row.original.description,
        Filter: BrandFilterInput

    },
    {
        Header: <FormattedMessage id="category.table.brought_out_of_assortment"
                                  defaultMessage="Brought Out Of Assortment"/>,
        accessor: "broughtOutOfAssortment",
        show:true,
        style: {overflow: 'visible'},
        headerStyle: {overflow: 'visible'},
        Cell: row => row.original.broughtOutOfAssortment ? "Yes" : "No",
        Filter: SimpleSelectFilter

    },
    {
        Header: <FormattedMessage id="category.table.articule_number"
                                  defaultMessage="Articule Number"/>,
        accessor: "articuleNumber",
        show:true,
        filterable: false
    },
    {
        Header: <FormattedMessage id="category.table.barcode" defaultMessage="Barcode"/>,
        accessor: "barCode",
        show:true,
        filterable: false
    },
    {
        Header: <FormattedMessage id="category.table.description" defaultMessage="Description"/>,
        accessor: "description",
        show:true,
        filterable: false
    },
    {
        Header: (
            <FormattedMessage
                id="item_name.table.active"
                defaultMessage="Active"
            />
        ),
        show:true,
        accessor: "active",
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
    }

]

export default columns;