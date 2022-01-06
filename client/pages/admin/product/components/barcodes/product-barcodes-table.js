import React from 'react'
import ReactTable from "../../../../../components/react-table/react-table-intl";
import {FormattedMessage} from 'react-intl';
import classnames from 'classnames';


const filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    return (
        row[id] !== undefined ?
            String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
            :
            true
    );
};

const ValueIcon = props => {
    if (props.value) {
        return <i className="fa fa-check text-success"/>
    } else {
        return <i className="fa fa-times text-danger mr-1"/>
    }
};


export default function (props) {

    if (!props.show) return null;

    return (


        <ReactTable
            minRows={1}
            loading={props.loading}
            data={props.list}
            filterable
            columns={[
                {
                    Header: <FormattedMessage id="product.barcodes.table.articule_number" defaultMessage="Barcode"/>,
                    accessor: "barcode"
                },
                {
                    Header: <FormattedMessage id="product.barcodes.table.category" defaultMessage="Category"/>,
                    accessor: "categoryDescription"

                },
                {
                    Header: <FormattedMessage id="product.barcodes.table.partner_item_name" defaultMessage="Partner Item Name"/>,
                    accessor: "partnersItemName"
                },
                {
                    Header: <FormattedMessage id="product.barcodes.table.shop" defaultMessage="Shop"/>,
                    accessor: "shopDescription"
                }

            ]}
            defaultFilterMethod={filterCaseInsensitive}
            defaultPageSize={10}
            className="-striped"
            getTrProps={(state, rowInfo) => {
                if (rowInfo && rowInfo.row) {
                    return {
                        onClick: props.onClickRow.bind(this, rowInfo),
                        className: classnames(
                            {
                                'row-selected': rowInfo.index === props.selectedIndex,
                                'row-deleted': rowInfo.index !== props.selectedIndex && rowInfo.original.crud === 'd',
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