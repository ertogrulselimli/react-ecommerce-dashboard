import React from "react";
import {FormattedMessage} from "react-intl";
import {displayName} from "../../../../helpers";
import classnames from "classnames";
import SelectFilter from "../../../../components/react-table/select-filter";


const filterCaseInsensitive = (filter, row) => {
  const id = filter.pivotId || filter.id;
  return row[id] !== undefined
    ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
    : true;
};

export default function(props) {
  return (
    <PaginatedTable
      {...props}
      columns={[
        {
          Header: (
            <FormattedMessage id="attribute.table.id" defaultMessage="ID" />
          ),
          accessor: "id",
          maxWidth: 100,
          filterable: false
        },
        {
          Header: (
            <FormattedMessage id="attribute.table.name" defaultMessage="Name" />
          ),
          accessor: "name",
          filterable: false,
          Cell: row => displayName(row.original.displayName)
        },
        {
          Header: (
            <FormattedMessage
              id="attribute.table.description"
              defaultMessage="Description"
            />
          ),
          accessor: "description",
          filterable: false
        },
        {
          Header: (
            <FormattedMessage id="attribute.table.type" defaultMessage="Type" />
          ),
          accessor: "type",
          filterable: false
        },
        {
          Header: (
            <FormattedMessage
              id="attributes.table.active"
              defaultMessage="Active"
            />
          ),
          accessor: "active",
          style: { overflow: "visible" },
          headerStyle: { overflow: "visible" },
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
          Filter: props => (
            <SelectFilter
              {...props}
              options={[
                { value: "YES", label: "yes" },
                { value: "NO", label: "no" },
                { value: "ALL", label: "all" }
              ]}
            />
          )
        }
      ]}
      defaultFilterMethod={filterCaseInsensitive}
    />
  );
}
