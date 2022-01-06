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
            <FormattedMessage id="city.table.code" defaultMessage="Code" />
          ),
          accessor: "code"
        },
        {
          Header: (
            <FormattedMessage
              id="city.table.description"
              defaultMessage="Description"
            />
          ),
          accessor: "description"
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
