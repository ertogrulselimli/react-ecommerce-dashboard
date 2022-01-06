import React from "react";
import ReactTable from "../../../../components/react-table/react-table-intl";
import { FormattedMessage } from "react-intl";
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
              id="articuleandbarcode.table.id"
              defaultMessage="id"
            />
          ),
          accessor: "id"
        },
        {
          Header: (
            <FormattedMessage
              id="articuleandbarcode.table.articuleNumber"
              defaultMessage="Articule"
            />
          ),
          accessor: "articuleNumber"
        },
        {
          Header: (
            <FormattedMessage
              id="articuleandbarcode.table.barCode"
              defaultMessage="Barcode"
            />
          ),
          accessor: "barCode"
        },
        {
          Header: (
            <FormattedMessage
              id="articuleandbarcode.table.partnersItemName"
              defaultMessage="Partner's Item name"
            />
          ),
          accessor: "partnersItemName"
        },
        {
          Header: (
            <FormattedMessage
              id="articuleandbarcode.table.partnersItemModel"
              defaultMessage="Partner's Item model"
            />
          ),
          accessor: "partnersItemModel"
        },
        {
          Header: (
            <FormattedMessage
              id="articuleandbarcode.table.shopDescription"
              defaultMessage="Shop"
            />
          ),
          accessor: "shopDescription"
        },
        {
          Header: (
            <FormattedMessage
              id="articuleandbarcode.table.productDescription"
              defaultMessage="Product"
            />
          ),
          accessor: "productDescription"
        },
        {
          Header: (
            <FormattedMessage
              id="articuleandbarcode.table.categoryDescription"
              defaultMessage="Category"
            />
          ),
          accessor: "categoryDescription"
        }
      ]}
      initialSearch={props.initialSearch}
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
