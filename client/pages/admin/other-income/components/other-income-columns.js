import React from "react";
import {FormattedMessage} from "react-intl";
import classnames from "classnames";
import CommonPaginatedSelectInput from "../../common/mx-paginated-select-filter";
import {shopFilterUrl, typeOfIncomeFilterUrl} from "../../common/constants";
import {SimpleStartDateInput, SimpleEndDateInput} from '../../common/mx-common-table-filter-exports';

const TypeOfIncomeInput = props => (
    <CommonPaginatedSelectInput
        filterUrl={typeOfIncomeFilterUrl}
        query={{
            sort:"id,desc"
        }}
        onChange={props.onChange}
        value={props.filter?props.filter.value: null}
    />
);

const ShopFilterInput = props => (
    <CommonPaginatedSelectInput
        filterUrl={shopFilterUrl}
        query={{
            sort: "id,desc"
        }}
        onChange={props.onChange}
        value={props.filter ? props.filter.value : null}
    />
);


const otherIncomeColumns = [
    {
        Header: (
            <FormattedMessage
                id="other.income.table.type_of_income"
                defaultMessage="Type of Income"
            />
        ),
        accessor: "typeOfIncomeId",
        show:true,
        Cell: row=>row.original.typeOfIncomeDescription,
        Filter: TypeOfIncomeInput
    },
    {
        Header: (
            <FormattedMessage
                id="other.income.table.shop_description"
                defaultMessage="Shop Description"
            />
        ),
        accessor: "shopId",
        show:true,
        Cell: row => row.original.shopDescription,
        Filter: ShopFilterInput
    },
    {
        Header: (
            <FormattedMessage
                id="other.income.table.amount"
                defaultMessage="Amount"
            />
        ),
        accessor: "amount",
        filterable: false,
        show:true
    },

    {
        Header: (
            <FormattedMessage
                id="other.income.table.activation_date_from"
                defaultMessage="Activation Date From"
            />
        ),
        accessor: "activationDateFrom",
        show: true,
        Cell: row => row.original.activationDateFrom,
        Filter: SimpleStartDateInput
    },
    {
        Header: (
            <FormattedMessage
                id="other.income.table.activation_date_to"
                defaultMessage="Activation Date To"
            />
        ),
        accessor: "activationDateTo",
        show: true,
        Cell: row => row.original.activationDateTo,
        Filter: SimpleEndDateInput
    }
];

export default otherIncomeColumns;