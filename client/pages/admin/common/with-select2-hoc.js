/**
 * Created by Administrator on 4/1/2019.
 */
import React from "react";
import onFetchData from "./on-fetch-data";
import CenterCircularProgress from "./../../../components/ui-elements/center-circular-progress";

function withSubscription(WrappedComponent, extraInfo) {

   class HOC extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: false,
                list: [],
              //  attributeTypes: ["LIST", "TEXT"], this belongs to attribute ....................
                rowIndex:null,
                filter: "",
                page: 0,
                filtered: [
                    {
                        id: "active",
                        value: {value: "YES", label: "Yes"}
                    }
                ],
                initialSearch: true
            };
            this.onFetchData=onFetchData.bind(this);
            this.additionalFilters = extraInfo.additionalFilters, //[{id: 'group', value: 'PRODUCT'}] // this belong to attribute value not
            this.filterUrl = extraInfo.filterUrl,  //`attributes/attribute/filtered/`
            this.tableState = null;
            this.fetchTimeout = false;
        }

        onChangeFilter(value) {
            this.setState({filter: value});
            this.onFetchData();
        }

        onFilteredChange(filtered) {
            this.setState({filtered});
        }

        onClickRow(row) {
            this.setState({
                rowIndex: this.state.selected && row.original.id === this.state.selected.id ? null : row.index
            });
            this.props.onSelectEntity(row.original)
        }

        render() {
            if (this.props.hide) return null;
            return (
                <div>
                    <WrappedComponent
                        show={true}
                        loading={this.state.loading}
                        list={this.state.list}
                        onClickRow={this.onClickRow.bind(this)}
                        selectedIndex={this.state.rowIndex}
                       // attributeTypes={this.state.attributeTypes}
                        filtered={this.state.filtered}
                        onFilteredChange={this.onFilteredChange.bind(this)}
                        initialSearch={this.state.initialSearch}
                        onFetchData={this.onFetchData.bind(this)}
                        pages={this.state.page}
                        showTextFilterInput={true}
                        filterInitialValue={this.state.filter}
                        onFilterTextChange={this.onChangeFilter.bind(this)}
                        filterInputTimout={500}
                        {...this.props}
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

    };

   return HOC;
}

export  default withSubscription