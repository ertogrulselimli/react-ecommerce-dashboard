/**
 * Created by Administrator on 4/7/2019.
 */
import React from "react";
import api from "../../../api";
import ReactTable from "react-table";
import { FormattedMessage } from "react-intl";
import classnames from "classnames";
import FilterInput from "../../../components/form-elements/filter-input";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Scrollbar from "perfect-scrollbar-react";
import "perfect-scrollbar-react/dist/style.min.css";

const CustomTbodyComponent = props => (
  <div {...props} className={classnames("rt-tbody" || [])}>
    <Scrollbar>{props.children}</Scrollbar>
  </div>
);

export default class MXReactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      tableColumns: props.columns,
      data: [],
      showColumnsFilter: false,
      loading: false,
      pages: 0
    };

    this.initialSearch = true;
    this.toggleColumnsFilter = this.toggleColumnsFilter.bind(this);
    this.onFilterColumn = this.onFilterColumn.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onFetchData = this.onFetchData.bind(this);
    this.updateExternally = this.updateExternally.bind(this);
    this.fetchTimeout = false;
    this.filterTimeout = false;
  }

  toggleColumnsFilter() {
    this.setState({ showColumnsFilter: !this.state.showColumnsFilter });
  }

  updateExternally() {
    this.table.fireFetchData();
  }

  onFetchData(state, instance) {
    if (this.fetchTimeout) clearTimeout(this.fetchTimeout);
    let Fetch = () => {
      this.setState({ loading: true });
      let filter = {};
      let filtered = state.filtered;
      filtered.forEach(f => {
        if (!f.value) {
          return;
        }
        if (f.value.value) {
          filter[f.id] = f.value.value;
        }
        else {
          filter[f.id] = f.value ? f.value : null;
        }
      });
      api
        .post(
          this.props.filterUrl +
            `?page=${state.page}&size=${state.pageSize}&sort=id,desc`,
          { ...filter }
        )
        .then(response => {
          this.setState({
            data: response.data.content,
            loading: false,
            pages: Math.ceil(response.data.totalElements / state.pageSize)
          });
        });
    };
    this.fetchTimeout = setTimeout(() => {
      Fetch();
    }, 0);
  }

  onChangeFilter(value) {
    console.log("on CHange filter of mx react table ...");
    this.table.filterColumn({ id: "filter", filterable: true }, value);
  }

  onFilterColumn(e) {
    console.log("on Filter Column of mx react table");
    let id = e.target.id;
    this.setState(state => {
      const list = state.tableColumns.map(item => {
        if (item.accessor == id) {
          item["show"] = !item["show"];
          return item;
        } else {
          return item;
        }
      });
      return {
        tableColumns: list
      };
    });
  }

  //..........................................Lifecycle methods ..........................

  componentWillUnmount() {
    console.log("mx reacttable component will unmount...");
    clearTimeout(this.fetchTimeout);
    clearTimeout(this.filterTimeout);
  }

  componentDidMount() {
    /* const tableColumns=this.props.columns;*/
    if (this.filterTimeout) clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(() => {
      const defaultFilters = this.props.defaultFilters;
      defaultFilters.forEach(f => {
        this.table.filterColumn({ id: f.id }, f.value);
      });
    }, 1);
    /*       this.setState({tableColumns:tableColumns});*/
  }

  render() {
    const { data, pages, loading } = this.state;
    return (
      <div className="row" style={{ overflow: "visible" }}>
        <div className="col-1">
          <Dropdown
            isOpen={this.state.showColumnsFilter}
            toggle={this.toggleColumnsFilter}
          >
            <DropdownToggle color="default" caret>
              <i className="fa fa-filter" />
            </DropdownToggle>
            <DropdownMenu>
              <ul className="list-group">
                {this.state.tableColumns.map(col => {
                  return (
                    <li
                      className="list-group-item py-0 px-1"
                      key={col.accessor}
                    >
                      <label
                        className="d-flex align-items-center m-0"
                        htmlFor={col.accessor}
                      >
                        <input
                          key={col.accessor}
                          type="checkbox"
                          checked={col.show ? true : false}
                          id={col.accessor}
                          onChange={this.onFilterColumn}
                        />
                        &nbsp;
                        {col.accessor}
                      </label>
                    </li>
                  );
                })}
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
            ref={instance => {
              this.table = instance;
            }}
            columns={this.state.tableColumns}
            minRows={1}
            loading={loading}
            data={data}
            manual
            filterable
            pageSizeOptions={[1, 5, 10, 20, 25, 50, 100]}
            defaultPageSize={10}
            pages={pages}
            onFetchData={this.onFetchData}
            getTrProps={(state, rowInfo) => {
              if (rowInfo && rowInfo.row) {
                if (this.props.onDoubleClickRow) {
                  return {
                    onDoubleClick: this.props.onDoubleClickRow.bind(
                      this,
                      rowInfo
                    )
                  };
                } else if (this.props.onClickRow) {
                  return {
                    onClick: this.props.onClickRow.bind(this, rowInfo),
                    className: classnames({
                      "row-selected": rowInfo.index === this.props.selectedIndex
                    })
                  };
                } else {
                  return {};
                }
              } else {
                return {};
              }
            }}
            TbodyComponent={CustomTbodyComponent}
            previousText={
              <FormattedMessage
                id="table.previous_page"
                defaultMessage="Previous"
              />
            }
            nextText={
              <FormattedMessage id="table.next_page" defaultMessage="Next" />
            }
            loadingText={
              <FormattedMessage
                id="table.loading"
                defaultMessage="Loading..."
              />
            }
            noDataText={
              this.initialSearch ? (
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
            pageText={
              <FormattedMessage id="table.page" defaultMessage="Page" />
            }
            ofText={<FormattedMessage id="table.of_text" defaultMessage="of" />}
            rowsText="sətir"
            style={{
              height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
            }}
          />
        </div>
      </div>
    );
  }
}
