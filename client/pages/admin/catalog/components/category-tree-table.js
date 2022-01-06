import React from "react";
import { displayName } from "../../../../helpers";
import classnames from "classnames";
import { injectIntl, FormattedMessage } from "react-intl";

const ExpandIcon = props => {
  if (props.hide) return null;

  return (
    <i
      className={classnames([
        "fa mr-1",
        {
          "text-muted": !props.isSelected,
          "text-white": props.isSelected,
          "fa-chevron-down": props.expanded,
          "fa-chevron-right": !props.expanded
        }
      ])}
      onClick={props.onClick}
    />
  );
};

class CategoryTableRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  getParams() {
    return {
      category: this.props.category,
      siblings: this.props.siblings,
      children: this.props.category.children || []
    };
  }

  toggle(e) {
    e.stopPropagation();
    if (this.props.category.children && this.props.category.children.length) {
      this.setState({ expanded: !this.state.expanded });
    }
  }

  expand() {
    this.setState({ expanded: true });
    if (this.props.expandParent) this.props.expandParent();
  }

  onClick() {
    if (this.props.onClick) this.props.onClick(this.getParams());
  }

  isSelected() {
    return (
      this.props.selected && this.props.category.id === this.props.selected
    );
  }

  render() {
    const category = this.props.category;
    const children = this.props.category.children || [];

    if (
      category.filterMatched &&
      this.props.expandParent &&
      category.filterTime !== this.filterTime
    ) {
      this.filterTime = category.filterTime;
      this.props.expandParent();
    }

    return (
      <React.Fragment>
        <tr
          onClick={this.onClick.bind(this)}
          className={classnames({
            "bg-gray-100": !this.isSelected() && this.props.step,
            "bg-info": this.isSelected(),
            "d-none": this.props.hide || category.filterMatched === false
          })}
        >
          <td>{category.id}</td>
          <td>{category.code}</td>

          <td>{category.categoryLevel}</td>

          <td
            className="text-truncate"
            style={{ paddingLeft: `${(this.props.step + 1) * 20}px` }}
          >
            <ExpandIcon
              isSelected={this.isSelected()}
              hide={!children.length}
              onClick={this.toggle.bind(this)}
              expanded={this.state.expanded}
            />
            {displayName(category.displayName)}
          </td>

          <td>{category.description}</td>
          <td className="text-center">
            <span>
              {category.root ? (
                <FormattedMessage id="table.yes_message" defaultMessage="Yes" />
              ) : (
                <FormattedMessage id="table.no_message" defaultMessage="No" />
              )}
            </span>
          </td>
          <td className="text-center">
            <span>
              {category.concrete ? (
                <FormattedMessage id="table.yes_message" defaultMessage="Yes" />
              ) : (
                <FormattedMessage id="table.no_message" defaultMessage="No" />
              )}
            </span>
          </td>
          <td>
            <span>{category.parentId === 0 ? null : category.parentId}</span>
          </td>
          <td>{category.parentCode}</td>
          <td>
            <i
              className={classnames([
                "fa",
                {
                  "fa-check text-success": category.active,
                  "fa-times text-danger": !category.active
                }
              ])}
            />
          </td>
        </tr>

        {children.map((childCategory, key) => (
          <CategoryTableRow
            hide={!this.state.expanded || this.props.hide}
            key={key}
            step={(this.props.step || 0) + 1}
            category={childCategory}
            expandParent={this.expand.bind(this)}
            onClick={this.props.onClick}
            selected={this.props.selected}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default ({ show, list, onFilterChange, filter, ...rest }) => {
  if (!show) return null;

  return (
    <div
      className="table-wrapper"
      style={{ maxHeight: "400px", overflow: "auto" }}
    >
      <table className="table table-bordered table-wrapper-scroll-y category-tree-table table-responsive">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="category.table.id" defaultMessage="ID" />
            </th>
            <th>
              <FormattedMessage
                id="category.table.code"
                defaultMessage="Code"
              />
            </th>
            <th>
              <FormattedMessage
                id="category.table.categoryLevel"
                defaultMessage="categoryLevel"
              />
            </th>
            <th>
              <FormattedMessage
                id="category.table.name"
                defaultMessage="Display Name"
              />
            </th>
            <th>
              <FormattedMessage
                id="category.table.description"
                defaultMessage="Description"
              />
            </th>
            <th>
              <FormattedMessage
                id="category.table.root"
                defaultMessage="Root"
              />
            </th>
            <th>
              <FormattedMessage
                id="category.table.concrete"
                defaultMessage="Concrete"
              />
            </th>
            <th>
              <FormattedMessage
                id="category.table.parent_id"
                defaultMessage="Parent ID"
              />
            </th>
            <th>
              <FormattedMessage
                id="category.table.parentCode"
                defaultMessage="parentCode"
              />
            </th>
            <th>
              <FormattedMessage
                id="category.table.active"
                defaultMessage="Active"
              />
            </th>
          </tr>
          <tr>
            <th />
            <th>
              <input
                style={{ width: "60px" }}
                type="text"
                value={filter.code}
                onChange={e => {
                  let value = e.target.value;
                  onFilterChange("code", value);
                }}
              />
            </th>
            <th>
              <input
                style={{ width: "60px" }}
                type="number"
                value={filter.categoryLevel}
                onChange={e => {
                  let value = e.target.value;
                  onFilterChange("categoryLevel", value);
                }}
              />
            </th>
            <th>
              <input
                type="text"
                value={filter.displayName}
                onChange={e => {
                  let value = e.target.value;
                  onFilterChange("displayName", value);
                }}
              />
            </th>
            <th>
              <input
                type="text"
                value={filter.description}
                onChange={e => {
                  let value = e.target.value;
                  onFilterChange("description", value);
                }}
              />
            </th>

            <th>
              <React.Fragment>
                <select
                  className="form-control"
                  onChange={e => {
                    let value = e.target.value;
                    onFilterChange("root", value);
                  }}
                  value={filter.root}
                >
                  <option />
                  <FormattedMessage id="table.yes_message">
                    {txt => <option value={true}>{txt}</option>}
                  </FormattedMessage>
                  <FormattedMessage id="table.no_message">
                    {txt => <option value={false}>{txt}</option>}
                  </FormattedMessage>
                </select>
              </React.Fragment>
            </th>
            <th>
              <select
                className="form-control"
                onChange={e => {
                  let value = e.target.value;
                  onFilterChange("concrete", value);
                }}
                value={filter.concrete}
              >
                <option />
                <FormattedMessage id="table.yes_message">
                  {txt => <option value={true}>{txt}</option>}
                </FormattedMessage>
                <FormattedMessage id="table.no_message">
                  {txt => <option value={false}>{txt}</option>}
                </FormattedMessage>
              </select>
            </th>
            <th />
            <th>
              <input
                type="text"
                value={filter.parentCode}
                onChange={e => {
                  let value = e.target.value;
                  onFilterChange("parentCode", value);
                }}
              />
            </th>
            <th>
              <select
                className="form-control"
                onChange={e => {
                  let value = e.target.value;
                  onFilterChange("active", value);
                }}
                value={filter.active}
              >
                <option />
                <FormattedMessage id="table.active_message">
                  {txt => <option value={true}>{txt}</option>}
                </FormattedMessage>
                <FormattedMessage id="table.deactive_message">
                  {txt => <option value={false}>{txt}</option>}
                </FormattedMessage>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((category, key) => (
            <CategoryTableRow key={key} category={category} {...rest} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
