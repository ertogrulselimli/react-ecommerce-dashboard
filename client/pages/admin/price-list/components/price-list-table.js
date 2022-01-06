import React from "react";
// Import React Table
import ReactTable from "../../../../components/react-table/react-table-intl";
import { FormattedMessage } from "react-intl";
import { displayName } from "../../../../helpers/";
import classnames from "classnames";

export default function(props) {
  if (!props.show) return null;

  return (
    <ReactTable
      minRows={1}
      loading={props.loading}
      data={props.list}
      columns={[
        {
          Header: (
            <FormattedMessage
              id="price.list.table.shopId"
              defaultMessage="Shop Id"
            />
          ),
          accessor: "shopId"
        },
        {
          Header: (
            <FormattedMessage
              id="price.list.table.productId"
              defaultMessage="Product Id"
            />
          ),
          accessor: "productId"
        },
        {
          Header: (
            <FormattedMessage
              id="price.list.table.from"
              defaultMessage="From"
            />
          ),
          accessor: "from"
        },
        {
          Header: (
            <FormattedMessage id="price.list.table.to" defaultMessage="To" />
          ),
          accessor: "to"
        },
        {
          Header: (
            <FormattedMessage
              id="price.list.table.articuleNumber"
              defaultMessage="Articule Number"
            />
          ),
          accessor: "articuleNumber"
        },
        {
          Header: (
            <FormattedMessage
              id="price.list.table.barCode"
              defaultMessage="Bar Code"
            />
          ),
          accessor: "barCode"
        },
        {
          Header: (
            <FormattedMessage
              id="price.list.table.price"
              defaultMessage="Price"
            />
          ),
          accessor: "price"
        },
        {
          Header: (
            <FormattedMessage
              id="price.list.table.saleQuantity"
              defaultMessage="Sale quantity"
            />
          ),
          accessor: "saleQuantity"
        },
        {
          Header: (
            <FormattedMessage
              id="price.list.table.discountForQuantity"
              defaultMessage="Discount for Quantity"
            />
          ),
          accessor: "discountForQuantity"
        },
        {
          Header: (
            <FormattedMessage
              id="price.list.table.comissionOfPlatformOwner"
              defaultMessage="Comission of Platform Owner"
            />
          ),
          accessor: "comissionOfPlatformOwner"
        },
        {
          Header: (
            <FormattedMessage
              id="price.list.table.available"
              defaultMessage="Available"
            />
          ),
          accessor: "available",
          width: 100,
          Cell: row => (
            <i
              className={classnames([
                "fa",
                {
                  "fa-check text-success": row.original.available,
                  "fa-times text-danger": !row.original.available
                }
              ])}
            />
          )
        },
        {
          Header: (
            <FormattedMessage
              id="price.list.table.expectedDeliveryTime"
              defaultMessage="Expested Delivery Time"
            />
          ),
          accessor: "expectedDeliveryTime"
        },
        {
          Header: (
            <FormattedMessage
              id="price.list.table.penaltyForGoodRefusal"
              defaultMessage="Penalty For Good Refusal"
            />
          ),
          accessor: "penaltyForGoodRefusal"
        },
        {
          Header: (
            <FormattedMessage
              id="price.list.table.active"
              defaultMessage="Active"
            />
          ),
          accessor: "active",
          width: 100,
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
          )
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
