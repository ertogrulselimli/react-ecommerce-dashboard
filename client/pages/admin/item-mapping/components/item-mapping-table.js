import React from 'react'
// Import React Table
import ReactTable from "../../../../components/react-table/react-table-intl";
import {FormattedMessage} from 'react-intl';
import classnames from 'classnames';


export default function (props) {

    return (


        <div className={classnames({'d-none': !props.show})}>
            <ReactTable
                minRows={1}
                loading={props.loading}
                data={props.list}
                columns={[
                    {
                        Header: <FormattedMessage id="item_mapping.table.articul_number"
                                                  defaultMessage="Articul Number"/>,
                        accessor: "articulNumber"
                    },
                    {
                        Header: <FormattedMessage id="item_mapping.table.barcode" defaultMessage="Barcode"/>,
                        accessor: "barCode",
                        Cell: row => row.original.barCode.map((b, k) => <div key={k}>{b}</div>)
                    },
                    {
                        Header: <FormattedMessage id="item_mapping.table.category_description"
                                                  defaultMessage="Category Description"/>,
                        accessor: "categoryDescription"
                    },
                    {
                        Header: <FormattedMessage id="item_mapping.table.item_name_description"
                                                  defaultMessage="Item Name Description"/>,
                        accessor: "itemNameDescription"
                    },
                    {
                        Header: <FormattedMessage id="item_mapping.table.shop_description"
                                                  defaultMessage="Shop Description"/>,
                        accessor: "shopDescription"
                    },
                    {
                        Header: <FormattedMessage id="item_mapping.table.active" defaultMessage="Active"/>,
                        accessor: "active",
                        width: 100,
                        Cell: row => <i className={classnames(['fa', {
                            'fa-check text-success': row.original.active,
                            'fa-times text-danger': !row.original.active,
                        }])}/>
                    }
                ]}
                manual
                defaultPageSize={10}
                className="-striped"
                pages={props.pages}
                onFetchData={props.onFetchData}
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
        </div>
    )
}