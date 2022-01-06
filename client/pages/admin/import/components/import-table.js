import React from 'react'
// Import React Table
import ReactTable from "../../../../components/react-table/react-table-intl";
import {FormattedMessage} from 'react-intl';
import {displayName} from '../../../../helpers/';
import classnames from 'classnames';


export default function (props) {
    if (!props.show) return null;

    return (


        <ReactTable
            minRows={1}
            loading={props.loading}
            data={props.list}
            columns={[
                {
                    Header: <FormattedMessage id="operation_import.table.id" defaultMessage="Id"/>,
                    accessor: "id",
                    maxWidth: 60
                },
                {
                    Header: <FormattedMessage id="operation_import.table.file_name" defaultMessage="File Name"/>,
                    accessor: "fileName",
                },
                {
                    Header: <FormattedMessage id="operation_import.table.shop" defaultMessage="Shop"/>,
                    accessor: "shopDescription",
                },
                {
                    Header: <FormattedMessage id="operation_import.table.template_name" defaultMessage="Template Name"/>,
                    accessor: "templateName",
                },
                {
                    Header: <FormattedMessage id="operation_import.table.create_date" defaultMessage="Create Date"/>,
                    accessor: "createdDate",
                    width: 120,
                    Cell: row => row.original.createdDate.substring(0, 10)
                },
                {
                    Header: <FormattedMessage id="operation_import.table.processed" defaultMessage="Processed"/>,
                    accessor: "processed",
                    width: 120,
                    Cell: row => <i className={classnames(['fa', {
                        'fa-check text-success': row.original.active,
                        'fa-times text-danger': !row.original.active,
                    }])}/>
                }

            ]}
            manual
            onFetchData={props.onFetchData}
            initialSearch={props.initialSearch}
            defaultPageSize={10}
            pages={props.pages}
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