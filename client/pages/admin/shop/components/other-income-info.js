import React from "react";
import ReactDOM from "react-dom";
import api from "../../../../api";
import OtherIncomeInfoTable from "./other-income-info-table";
import { injectIntl, defineMessages } from "react-intl";

class OtherIncomeInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingOtherIncomes: true,
      otherIncomes: [],
      selected: null,
      showForm: false
    };
  }

  componentDidMount() {
    if (this.props.shopId) {
      this.getOtherIncomes();
    }
  }

  getOtherIncomes() {
    this.setState({
      loadingOtherIncomes: false,
      otherIncomes: this.props.otherIncomes
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
    const { otherIncomes, selected } = this.state;
    return (
      <div>
        <OtherIncomeInfoTable
          show={this.props.shopId}
          loading={this.state.loadingOtherIncomes}
          list={this.state.otherIncomes}
          onClickRow={this.onClickRow.bind(this)}
          selectedIndex={this.state.selected}
        />
      </div>
    );
  }
}

export default injectIntl(OtherIncomeInfo);
