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
                    Header: <FormattedMessage id="attribute.name" defaultMessage="Name"/>,
                    accessor: "name",
                    Cell: row => displayName(row.original.attribute.displayName)
                },
                {
                    Header: <FormattedMessage id="producttype.attribute.table.rank" defaultMessage="Rank"/>,
                    accessor: "rank",
                    maxWidth: 100,
                },
                {
                    Header: <FormattedMessage id="producttype.attribute.table.mandatory" defaultMessage="Mandatory"/>,
                    accessor: "mandatory",
                    filterable: false,
                    maxWidth: 100,
                    Cell: row => <div className="text-center"><ValueIcon value={row.original.mandatory}/></div>
                },
                {
                    Header: <FormattedMessage id="producttype.attribute.table.show_in_filter"
                                              defaultMessage="Show in filter"/>,
                    accessor: "showInFilters",
                    filterable: false,
                    maxWidth: 100,
                    Cell: row => <div className="text-center"><ValueIcon value={row.original.showInFilters}/></div>
                },
                {
                    Header: <FormattedMessage id="producttype.attribute.table.active" defaultMessage="Active"/>,
                    accessor: "active",
                    maxWidth: 100,
                    Cell: row => <div className="text-center"><ValueIcon value={row.original.active}/></div>,
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
                                'row-deleted': rowInfo.index !== props.selectedIndex && rowInfo.original.crud === 'd',
                                'row-created': rowInfo.index !== props.selectedIndex && rowInfo.original.crud === 'i',
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