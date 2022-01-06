import React from "react";
import api from "../../../../api";
import AsyncSelect from "react-select/lib/Async";
import { displayName } from "../../../../helpers";

let timeout = false;

export default class TypeOfIncomeFilterInput extends React.Component {
  loadOptions(inputValue, callback) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      api
        .post(
          `type-of-incomes/type-of-income/filtered/0/100`,
          inputValue || "",
          {
            headers: {
              "Content-Type": "text/plain"
            }
          }
        )
        .then(response => {
          callback(
            response.data.map(t => ({
              value: t.id,
              label: t.description
            }))
          );
        });
    }, 300);
  }

  render() {
    return (
      <AsyncSelect
        defaultOptions
        cacheOptions
        placeholder="Search type of income"
        isClearable={true}
        loadOptions={this.loadOptions.bind(this)}
        menuPortalTarget={document.body}
        onChange={value => this.props.onChange(value ? value : null)}
        value={this.props.value}
        styles={{
          control: (base, state) => ({
            ...base,
            boxShadow: "none"
            // You can also use state.isFocused to conditionally style based on the focus state
          })
        }}
      />
    );
  }
}

TypeOfIncomeFilterInput.defaultProps = {
  filter: {
    filter: ""
  }
};
