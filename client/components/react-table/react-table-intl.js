import React, {Fragment,useState} from "react";
import ReactTable from "react-table";
import {FormattedMessage} from "react-intl";
import classNames from "classnames";
import FilterInput from "../form-elements/filter-input";
import Scrollbar from "perfect-scrollbar-react";
import "perfect-scrollbar-react/dist/style.min.css";

const CustomTbodyComponent = props => (
        <div {...props} className={classNames("rt-tbody", props.className || [])}>
            <Scrollbar>{props.children}</Scrollbar>
        </div>);


const ReactTableIntl = props => {



    return (
        <div className="row" style={{overflow:"visible"}}>
            <div className="col-3">
                {props.showTextFilterInput ? (
                    <FilterInput
                        initalValue={props.filterInitialValue} //
                        onChange={props.onFilterTextChange} // this.onChangeFilter
                        timeout={props.filterInputTimout}
                    />
                ) : null}
            </div>
            <div className="col-12">
                <ReactTable
                    pageSizeOptions={[1,5, 10, 20, 25, 50, 100, 1000]}
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
                        props.initialSearch ? (
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
                    pageText={<FormattedMessage id="table.page" defaultMessage="Page"/>}
                    ofText={<FormattedMessage id="table.of_text" defaultMessage="of"/>}
                    rowsText="sətir"

                    style={{
                        height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                    }}
                    {...props}

                />
            </div>
        </div>
    );
};

export default ReactTableIntl;
