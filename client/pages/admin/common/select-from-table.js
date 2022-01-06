/**
 * Created by Administrator on 4/10/2019.
 */
import React from 'react'
import MXReactTable from '../../../components/react-table/tg-react-table-intl'
import onFetchData from './on-fetch-data'
import CenterCircularProgress from "./../../../components/ui-elements/center-circular-progress";

//Note
//This component can be child of formik input components  whenever u select input from (paginated scrollable filterable table data)
//Props are filterUrl ,additionalFilters,onSelectEntity ,and columns

class SelectFromTgTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            list: [],
            //  attributeTypes: ["LIST", "TEXT"], this belongs to attribute ....................
            rowIndex: null,
            page: 0,
            filtered: [
                {
                    id: "active",
                    value: {value: "YES", label: "Yes"}
                }
            ],
            initialSearch: true
        };
        this.onDoubleClickRow=this.onDoubleClickRow.bind(this);
        this.onFetchData = onFetchData.bind(this);
        this.additionalFilters = props.additionalFilters, //[{id: 'group', value: 'PRODUCT'}] // this belong to attribute value not
            this.filterUrl = props.filterUrl,  //`attributes/attribute/filtered/`
            this.fetchTimeout = false;
    }

    onDoubleClickRow(row) {
        this.setState({
            rowIndex: row.index
        });
        this.props.onSelectEntity(row.original)
    }

    render()
    {

        let filtered=this.state.filtered.concat(this.props.filtered);
        return (
            <div>
            <MXReactTable
                columns={this.props.columns}
                show={true} //since this will be inside parent component ,it is show
                loading={this.state.loading}
                list={this.state.list}
                onDoubleClickRow={this.onDoubleClickRow}
                selectedIndex={this.state.rowIndex}
                filtered={filtered}
                initialSearch={this.state.initialSearch}
                onFetchData={this.onFetchData}
                pages={this.state.page}
                showTextFilterInput={true}
            />
                <div className="position-relative" style={{width: '100%'}}>
                    <CenterCircularProgress
                        show={!this.state.initalSearch && this.state.loading && !this.state.list.length}
                        size="32"
                        borderSize="4"
                    />
                </div>
            </div>
        )

    }
}


export default SelectFromTgTable;