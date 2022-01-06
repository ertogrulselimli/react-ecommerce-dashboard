import React from "react";
import { FormattedMessage } from "react-intl";
import CommonPaginatedSelectInput from "../../common/mx-paginated-select-filter";
import { categoryFilterUrl, shopFilterUrl } from "../../common/constants";
import { SimpleStartDateInput, SimpleEndDateInput} from "../../common/mx-common-table-filter-exports";


const CategoryFilterInput = props => (
  <CommonPaginatedSelectInput
    filterUrl={categoryFilterUrl}
    query={{
      sort: "id,desc"
    }}
    onChange={props.onChange}
    value={props.filter ? props.filter.value : null}
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

const comissionColumns = [
  {
    Header: (
      <FormattedMessage
        id="comission_by_category.table.id"
        defaultMessage="Id"
      />
    ),
    accessor: "id",
    filterable: false,
    show: true
  },
  {
    Header: (
      <FormattedMessage
        id="comission_by_category.table.category"
        defaultMessage="Category"
      />
    ),
    accessor: "categoryId",
    show: true,
    Cell: row => row.original.categoryDescription,
    Filter: CategoryFilterInput
  },
  {
    Header: (
      <FormattedMessage
        id="comission_by_category.table.shop"
        defaultMessage="Shop"
      />
    ),
    accessor: "shopId",
    show: true,
    Cell: row => row.original.shopDescription,
    Filter: ShopFilterInput
  },
  {
    Header: (
      <FormattedMessage
        id="comission_by_category.table.comission"
        defaultMessage="Comission"
      />
    ),
    accessor: "comission",
    filterable: false,
    show: true
  },
  {
    Header: (
      <FormattedMessage
        id="comission_by_category.table.from"
        defaultMessage="Date From"
      />
    ),
    accessor: "from",
    show: true,
    Cell: row => row.original.from,
    Filter: SimpleStartDateInput
  },
  {
    Header: (
      <FormattedMessage
        id="comission_by_category.table.to"
        defaultMessage="Date to"
      />
    ),
    accessor: "to",
    show: true,
    Cell: row => row.original.to,
    Filter: SimpleEndDateInput
  }
];

export default comissionColumns;
