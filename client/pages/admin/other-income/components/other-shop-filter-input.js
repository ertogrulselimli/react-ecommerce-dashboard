import React from "react";
import api from "../../../../api";
import AsyncSelect from "react-select/lib/Async";
import { displayName } from "../../../../helpers";

let timeout = false;

export default class OtherShopFilterInput extends React.Component {
  loadOptions(inputValue, callback) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      api
        .post(`shop/shops/filtered/0/100`, inputValue || "", {
          headers: {
            "Content-Type": "text/plain"
          }
        })
        .then(response => {
          callback(
            response.data.map(s => ({
              value: s.id,
              label: s.description
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
        placeholder="Search shop"
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

OtherShopFilterInput.defaultProps = {
  filter: {
    filter: ""
  }
};
