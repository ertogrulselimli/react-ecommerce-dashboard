import React from 'react'
import ReactTable from "../../../../components/react-table/react-table-intl";
import {FormattedMessage} from 'react-intl';
import {displayName} from '../../../../helpers';
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
                    Header: <FormattedMessage id="product.attributes.table.name" defaultMessage="Attribute Display Name"/>,
                    accessor: "name",
                    Cell: row => displayName(row.original.productTypeAttr.attribute.displayName)
                },
                {
                    Header: <FormattedMessage id="product.attributes.table.mandatory" defaultMessage="Mandatory"/>,
                    accessor: "mandatory",
                    maxWidth: 100,
                    filterable: false,
                    Cell: row => row.original.productTypeAttr.mandatory ?
                        <b>yes</b> : <b>no</b>

                },
                {
                    Header: <FormattedMessage id="product.attributes.table.unit" defaultMessage="Unit"/>,
                    accessor: "unit",
                    maxWidth: 100,
                    filterable: false,
                    Cell: row => row.original.attributeValue && row.original.attributeValue.unitOfMeasurement ?
                        displayName(row.original.attributeValue.unitOfMeasurement.displayName) : null

                },
                {
                    Header: <FormattedMessage id="product.attributes.table.value" defaultMessage="Value Display Name"/>,
                    accessor: "value",
                    filterable: false,
                    Cell: row => row.original.attributeValue ? row.original.attributeValue.attributeValueDescription: null
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