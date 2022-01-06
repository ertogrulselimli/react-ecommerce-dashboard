import React from 'react'
// Import React Table
import ReactTable from "../../../../components/react-table/react-table-intl";
import {FormattedMessage} from 'react-intl';
import classnames from 'classnames';


export default function (props) {
    if (!props.show) return null;

    return (


        <ReactTable
            minRows={2}
            loading={props.loading}
            data={props.list}
            columns={[
                {
                    Header: <FormattedMessage id="inventory.table.code" defaultMessage="Code"/>,
                    accessor: "code"
                },
                {
                    Header: <FormattedMessage id="inventory.table.name" defaultMessage="Name"/>,
                    accessor: "name",
                },
                {
                    Header: <FormattedMessage id="inventory.table.city" defaultMessage="City"/>,
                    accessor: "city",
                },
                {
                    Header: <FormattedMessage id="inventory.table.postcode" defaultMessage="Postcode"/>,
                    accessor: "postcode",
                },
                {
                    Header: <FormattedMessage id="inventory.table.shopCode" defaultMessage="Shop"/>,
                    accessor: "shopCode",
                },
                {
                    Header: <FormattedMessage id="inventory.table.multiple_shipping_supported" defaultMessage="Multiple shipping supported"/>,
                    accessor: "multipleShippingSupported",
                },
                {
                    Header: <FormattedMessage id="inventory.table.country_code" defaultMessage="Country code"/>,
                    accessor: "countryCode",
                },
                {
                    Header: <FormattedMessage id="inventory.table.description" defaultMessage="description"/>,
                    accessor: "description",
                }

            ]}
            defaultPageSize={10}
            className="-striped"
            getTrProps={(state, rowInfo) => {
                if (rowInfo && rowInfo.row) {
                    return {
                        onClick: props.onClickRow.bind(this, rowInfo),
                        className: classnames(
                            {
                                'row-selected': rowInfo.index === props.selectedIndex,
                            }
                        ),
                    }
                } else {
                    return {}
                }
            }}
        />
    )
}