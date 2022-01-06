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
                    Header: <FormattedMessage id="comission_by_category.table.id" defaultMessage="Id"/>,
                    accessor: "id",
                    maxWidth: 60
                },
                {
                    Header: <FormattedMessage id="comission_by_category.table.category" defaultMessage="Category"/>,
                    accessor: "categoryDescription",
                    minWidth: 200
                },
                {
                    Header: <FormattedMessage id="comission_by_category.table.shop" defaultMessage="Shop"/>,
                    accessor: "shopDescription",
                },
                {
                    Header: <FormattedMessage id="comission_by_category.table.comission" defaultMessage="Comission"/>,
                    accessor: "comission",
                },
                {
                    Header: <FormattedMessage id="comission_by_category.table.from" defaultMessage="Date From"/>,
                    accessor: "from",
                    width: 120
                },
                {
                    Header: <FormattedMessage id="comission_by_category.table.to" defaultMessage="Date to"/>,
                    accessor: "to",
                    width: 120
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