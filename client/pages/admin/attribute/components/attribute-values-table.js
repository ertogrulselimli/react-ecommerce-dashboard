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
                    Header: <FormattedMessage id="attribute.values.name" defaultMessage="Name"/>,
                    accessor: "name",
                    Cell: row => displayName(row.original.displayName)
                },
                {
                    Header: <FormattedMessage id="attribute.values.unit" defaultMessage="Unit"/>,
                    accessor: "Unit",
                    Cell: row => row.original.unitOfMeasurement ? row.original.unitOfMeasurement.code: ''
                },
                {
                    Header: <FormattedMessage id="attribute.values.description" defaultMessage="Description"/>,
                    accessor: "attributeValueDescription",
                },
                {
                    Header: <FormattedMessage id="attribute.values.table.code_mapping" defaultMessage="Code mapping"/>,
                    accessor: "attributeValueCodeMapping",
                },
                {
                    Header: <FormattedMessage id="attribute.values.table.desc_mapping" defaultMessage="Description mapping"/>,
                    accessor: "attributeValueDescMapping",
                },
                {
                    Header: <FormattedMessage id="attribute.table.active" defaultMessage="Active"/>,
                    accessor: "active",
                    width: 100,
                    Cell: row => <i className={classnames(['fa', {
                        'fa-check text-success': row.original.active,
                        'fa-times text-danger': !row.original.active,
                    }])} />
                    ,
                    Filter: props => (
                        <select {...props} onChange={e => props.onChange(e.target.value)}>
                            <option/>
                            <option value={true}>Active</option>
                            <option value={false}>Deleted</option>
                        </select>
                    ),
                    filterMethod: (filter, row) => filter.value === row._original.active.toString()
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
                                'row-disabled': !rowInfo.original.active,
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

