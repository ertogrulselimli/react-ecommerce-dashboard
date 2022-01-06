import React from "react";
import ReactTable from "../../../../components/react-table/react-table-intl";
import { FormattedMessage } from "react-intl";
import { displayName } from "../../../../helpers";
import classnames from "classnames";

export default function(props) {
  if (!props.show) return null;

  return (
    <ReactTable
      minRows={1}
      loading={props.loading}
      data={props.list}
      // filterable
      columns={[
        {
          Header: (
            <FormattedMessage
              id="other.income.table.amount"
              defaultMessage="Amount"
            />
          ),
          accessor: "amount"
        },
        {
          Header: (
            <FormattedMessage
              id="other.income.table.shop_description"
              defaultMessage="Shop Description"
            />
          ),
          accessor: "shopDescription"
        },
        {
          Header: (
            <FormattedMessage
              id="other.income.table.type_of_income"
              defaultMessage="Type of Income Description"
            />
          ),
          accessor: "typeOfIncomeDescription"
        },
        {
          Header: (
            <FormattedMessage
              id="other.income.table.activation_date_from"
              defaultMessage="Activation Date From"
            />
          ),
          accessor: "activationDateFrom"
        },
        {
          Header: (
            <FormattedMessage
              id="other.income.table.activation_date_to"
              defaultMessage="Activation Date To"
            />
          ),
          accessor: "activationDateTo"
        }
      ]}
      defaultPageSize={10}
      className="-striped"
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
  );
}
