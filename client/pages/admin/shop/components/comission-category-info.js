import React from "react";
import ReactDOM from "react-dom";
import api from "../../../../api";
import ComissionCategoryInfoTable from "./comission-category-info-table";
import { injectIntl, defineMessages } from "react-intl";

class ComissionCategoryInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingComByCat: true,
      comissionByCategories: [],
      selected: null,
      showForm: false
    };
  }

  componentDidMount() {
    if (this.props.shopId) {
      this.getComissionByCategories();
    }
  }

  getComissionByCategories() {
    this.setState({
      loadingComByCat: false,
      comissionByCategories: this.props.comissionByCategories
    });
    // api.get("shop/shop/" + this.props.shopId).then(response => {
    //   this.setState({
    //     otherIncomes: response.data.otherIncomes,
    //     loadingOtherIncomes: false
    //   });
    // });
  }

  onClickRow(row) {
    this.setState(state => {
      state.selected = row.index === state.selected ? null : row.index;
      return state;
    });
  }

  render() {
    const { comissionByCategories, selected, loadingComByCat } = this.state;
    return (
      <div>
        <ComissionCategoryInfoTable
          show={this.props.shopId}
          loading={loadingComByCat}
          list={comissionByCategories}
          onClickRow={this.onClickRow.bind(this)}
          selectedIndex={selected}
        />
      </div>
    );
  }
}

export default injectIntl(ComissionCategoryInfo);
