import React from "react";
// Import React Table
import ReactTable from "../../../../components/react-table/react-table-intl";
import SelectFilter from "../../../../components/react-table/select-filter";
import { FormattedMessage } from "react-intl";
import { displayName } from "../../../../helpers";
import classnames from "classnames";
import TypeOfIncomeFilterInput from "./type-of-incomes-filter-input";
import OtherShopFilterInput from "./other-shop-filter-input";

export default function(props) {
  return (
    <div className={classnames({ "d-none": !props.show })}>
      <ReactTable
        minRows={1}
        loading={props.loading}
        data={props.list}
        columns={[
          {
            Header: (
              <FormattedMessage
                id="other.income.table.type_of_income"
                defaultMessage="Type of Income"
              />
            ),
            accessor: "typeOfIncomeId",
            width: 300,
            style: { overflow: "visible" },
            headerStyle: { overflow: "visible" },
            Cell: row => row.original.typeOfIncomeDescription,
            Filter: props => (
              <TypeOfIncomeFilterInput
                onChange={props.onChange}
                value={props.filter ? props.filter.value : null}
              />
            )
          },
          {
            Header: (
              <FormattedMessage
                id="other.income.table.shop_description"
                defaultMessage="Shop Description"
              />
            ),
            accessor: "shopId",
            width: 300,
            style: { overflow: "visible" },
            headerStyle: { overflow: "visible" },
            Cell: row => row.original.shopDescription,
            Filter: props => (
              <OtherShopFilterInput
                onChange={props.onChange}
                value={props.filter ? props.filter.value : null}
              />
            )
          },
          {
            Header: (
              <FormattedMessage
                id="other.income.table.amount"
                defaultMessage="Amount"
              />
            ),
            accessor: "amount",
            filterable: false
          },

          {
            Header: (
              <FormattedMessage
                id="other.income.table.activation_date_from"
                defaultMessage="Activation Date From"
              />
            ),
            accessor: "activationDateFrom",
            filterable: false
          },
          {
            Header: (
              <FormattedMessage
                id="other.income.table.activation_date_to"
                defaultMessage="Activation Date To"
              />
            ),
            accessor: "activationDateTo",
            filterable: false
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
        getTrProps={(state, rowInfo) => {
          if (rowInfo && rowInfo.row) {
            return {
              onClick: props.onClickRow.bind(this, rowInfo),
              className: classnames({
                "row-selected": rowInfo.index === props.selectedIndex
              })
            };
          } else {
            return {};
          }
        }}
      />
    </div>
  );
}
