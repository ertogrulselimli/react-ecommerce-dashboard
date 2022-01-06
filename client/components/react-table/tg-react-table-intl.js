/**
 * Created by Administrator on 4/7/2019.
 */

import React from 'react';

import ReactTable from 'react-table'
import {FormattedMessage} from "react-intl";
import classnames from "classnames";
import FilterInput from "../form-elements/filter-input";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import Scrollbar from "perfect-scrollbar-react";
import "perfect-scrollbar-react/dist/style.min.css";

const CustomTbodyComponent = props => (
    <div {...props} className={classnames("rt-tbody" || [])}>
        <Scrollbar>{props.children}</Scrollbar>
    </div>
);



export  default class MXReactTable extends React.Component {
   constructor(props){
       super(props);
       this.state={
           filter:"",
           tableColumns: [],
           tableFiltered: [],
           showColumnsFilter:false,
           loading:this.props.loading,
       }
       this.toggleColumnsFilter=this.toggleColumnsFilter.bind(this);
       this.onFilterColumn=this.onFilterColumn.bind(this);
       this.onChangeFilter=this.onChangeFilter.bind(this);
     /*  this.onFilteredChange=this.onFilteredChange.bind(this);*/
   }


    hideLoadingMessage(){
        this.setState({loading:false})
    }

   componentDidMount(){
       const tableColumns=this.props.columns;
       const tableFiltered=this.props.filtered;
       this.setState({tableColumns:tableColumns,tableFiltered:tableFiltered});
       this.hideLoadingMessage();
   }


    toggleColumnsFilter(){
       this.setState({showColumnsFilter:!this.state.showColumnsFilter})
    }


/*    onFilteredChange(filtered) {
        this.setState({tableFiltered:filtered});
    }*/


     onFetchData(state){



     }


    onChangeFilter(value) {
        this.setState(state=> {
            let matched=false;
            const list=state.tableFiltered.map((item)=>{
                if(item.id === 'filter'){
                    item['value']=value;
                    matched=true;
                    return item;
                }else{
                    return item;
                }
            });
            if(!matched){
                list.push({id:'filter',value:value});
            }
            return {tableFiltered:list,filter:value};
        });
    }


    onFilterColumn(e){
       let id=e.target.id;
        this.setState(state => {
            const list = state.tableColumns.map((item) => {
                if (item.accessor == id) {
                    item['show']=!item['show'];
                    return item;
                } else {
                    return item;
                }
            });
            return {
                tableColumns:list,
            };
        });
    }


    render(){
        console.log('render of mx react table ')
        if (!this.props.show) return null;
        return (
            <div className="row" style={{overflow:"visible"}}>
                <div className="col-1">
                    <Dropdown
                        isOpen={this.state.showColumnsFilter}
                        toggle={this.toggleColumnsFilter}

                    >
                        <DropdownToggle
                            color="default"
                            caret>
                            <i className="fa fa-filter"/>
                        </DropdownToggle>
                        <DropdownMenu>
                            <ul className="list-group">
                                {
                                   this.state.tableColumns.map((col) => {
                                        return ( <li
                                                className="list-group-item py-0 px-1"
                                                key={col.accessor}
                                            >
                                                <label
                                                    className="d-flex align-items-center m-0"
                                                    htmlFor={col.accessor}>
                                                    <input
                                                        key={col.accessor}
                                                        type="checkbox"
                                                        checked={col.show?true:false}
                                                        id={col.accessor}
                                                        onChange={this.onFilterColumn}
                                                    />&nbsp;
                                                    {col.accessor}
                                                </label>
                                            </li>
                                        )})
                                }
                            </ul>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="col-3">
                    {this.props.showTextFilterInput ? (
                        <FilterInput
                            initalValue={this.state.filter} //
                            onChange={this.onChangeFilter} // this.onChangeFilter
                            timeout={300}
                        />
                    ) : null}
                </div>
                <div className="col-12">
                    <ReactTable
                        columns={this.state.tableColumns}
                        minRows={1}
                        loading={this.state.loading}
                        data={this.props.list}
                        manual
                        filterable
                        pageSizeOptions={[1, 5, 10, 20, 25, 50, 100]}
                        defaultPageSize={10}
                       // filtered={this.state.tableFiltered}
                       /* onFilteredChange={this.onFilteredChange}*/
                        pages={this.props.pages}
                        pageSize = {this.props.pageSize}
                        page={this.props.page}
                        onFetchData={this.props.onFetchData}
                        getTrProps={(state, rowInfo) => {
                            if (rowInfo && rowInfo.row) {
                                if (this.props.onDoubleClickRow) {
                                    return {
                                        onDoubleClick: this.props.onDoubleClickRow.bind(this, rowInfo)
                                    };
                                }
                                else if (this.props.onClickRow) {
                                    return {
                                        onClick: this.props.onClickRow.bind(this, rowInfo),
                                        className: classnames(
                                            {
                                                'row-selected': rowInfo.index === this.props.selectedIndex,
                                            }
                                        ),
                                    }
                                    }
                                    else {
                                        return {};
                                    }
                                }else{
                                return {};
                            }
                            }
                        }
                        TbodyComponent={CustomTbodyComponent}
                        previousText={
                            <FormattedMessage
                                id="table.previous_page"
                                defaultMessage="Previous"
                            />
                        }
                        nextText={
                            <FormattedMessage id="table.next_page" defaultMessage="Next"/>
                        }
                        loadingText={
                            <FormattedMessage id="table.loading" defaultMessage="Loading..."/>
                        }
                        noDataText={
                            this.props.initialSearch ? (
                                <FormattedMessage
                                    id="table.need_filter_for_show_data"
                                    defaultMessage="This panel requires filter to display results. Please type search phrase into filter input."
                                />
                            ) : (
                                <FormattedMessage
                                    id="table.no_data_found"
                                    defaultMessage="No data found"
                                />
                            )
                        }
                        className="-striped -highlight"
                        pageText={<FormattedMessage id="table.page" defaultMessage="Page"/>}
                        ofText={<FormattedMessage id="table.of_text" defaultMessage="of"/>}
                        rowsText="sətir"

                        style={{
                            height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                        }}
                    />
                </div>
            </div>
        );
    }


}