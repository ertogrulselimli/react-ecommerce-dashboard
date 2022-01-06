import React from "react";
// Import React Table
import ReactTable from "../../../../components/react-table/react-table-intl";
import { FormattedMessage } from "react-intl";
import { displayName } from "../../../../helpers/";
import classnames from "classnames";
import ExcelItemMappingTableForm from "./excel-item-mapping-table-form";

export default function(props) {
  if (!props.show) return null;

  return (
    <ReactTable
      resizable={false}
      minRows={1}
      loading={props.loading}
      data={props.list}
      columns={[
        {
          Header: (
            <FormattedMessage
              id="excel_item_mapping.table.category1"
              defaultMessage="Category1"
            />
          ),
          accessor: "category1",
          minWidth: 200,
          show: props.showColumns.category1
        },
        {
          Header: (
            <FormattedMessage
              id="excel_item_mapping.table.category2"
              defaultMessage="Category2"
            />
          ),
          accessor: "category2",
          minWidth: 200,
          show: props.showColumns.category2
        },
        {
          Header: (
            <FormattedMessage
              id="excel_item_mapping.table.category3"
              defaultMessage="Category3"
            />
          ),
          accessor: "category3",
          minWidth: 200,
          show: props.showColumns.category3
        },
        {
          Header: (
            <FormattedMessage
              id="excel_item_mapping.table.shop"
              defaultMessage="Shop"
            />
          ),
          accessor: "shopDescription",
          show: props.showColumns.shopDescription
        },
        {
          Header: (
            <FormattedMessage
              id="excel_item_mapping.table.brand"
              defaultMessage="Brand"
            />
          ),
          accessor: "brand",
          show: props.showColumns.brand
        },
        {
          Header: (
            <FormattedMessage
              id="excel_item_mapping.table.item_name"
              defaultMessage="Item Name"
            />
          ),
          accessor: "itemName",
          show: props.showColumns.itemName,
          minWidth: 200
        },
        {
          Header: (
            <FormattedMessage
              id="excel_item_mapping.table.model"
              defaultMessage="Model"
            />
          ),
          accessor: "model",
          show: props.showColumns.model
        },
        {
          Header: (
            <FormattedMessage
              id="excel_item_mapping.table.name_az"
              defaultMessage="Name az"
            />
          ),
          accessor: "nameAz",
          show: props.showColumns.nameAz,
          minWidth: 200
        },
        {
          Header: (
            <FormattedMessage
              id="excel_item_mapping.table.name_ru"
              defaultMessage="Name ru"
            />
          ),
          accessor: "nameRu",
          show: props.showColumns.nameRu,
          minWidth: 200
        },
        {
          Header: (
            <FormattedMessage
              id="excel_item_mapping.table.price"
              defaultMessage="Price"
            />
          ),
          accessor: "price",
          show: props.showColumns.price
        },
        {
          Header: (
            <FormattedMessage
              id="excel_item_mapping.table.articule_number"
              defaultMessage="Articule Number"
            />
          ),
          accessor: "articuleNumber",
          show: props.showColumns.articuleNumber
        },
        {
          Header: (
            <FormattedMessage
              id="excel_item_mapping.table.barcode"
              defaultMessage="Barcode"
            />
          ),
          accessor: "barCode",
          show: props.showColumns.barCode,
          minWidth: 120
        },
        {
          Header: (
            <React.Fragment>
              <div className="d-flex justify-content-between">
                <span />
                <span>Platform category</span>
                <span>Platform brand</span>
                <span>Platform item name</span>
                <span>Platform product model</span>
                <span>Action</span>
              </div>
            </React.Fragment>
          ),
          // (
          //   <FormattedMessage
          //     id="excel_item_mapping.table.action"
          //     defaultMessage="action"
          //   />
          // ),
          //   columns: [
          //     {
          //       Header: "Platform category",
          //       maxWidth: 700
          //     },
          //     {
          //       Header: "Platform brand",
          //       width: 400
          //     },
          //     {
          //       Header: "Platform item name",
          //       maxWidth: 400
          //     },
          //     {
          //       Header: "Platform product model",
          //       width: 400
          //     }
          //   ],
          accessor: "action",
          minWidth: 900,
          Cell: row => (
            <ExcelItemMappingTableForm
              isMapped={props.isMapped}
              data={row.original}
              categoryDefaultOptions={props.categoryDefaultOptions}
              brandDefaultOptions={props.brandDefaultOptions}
            />
          )
        }
      ]}
      manual
      onFetchData={props.getComissions}
      initialSearch={props.initialSearch}
      defaultPageSize={10}
      pages={props.pages}
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
