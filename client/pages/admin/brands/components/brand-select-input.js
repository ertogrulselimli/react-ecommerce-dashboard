import React from "react";
import api from "../../../../api";
import AsyncSelect from "react-select/lib/Async";
import { displayName } from "../../../../helpers";

export const dataToSelectOptions = data => {
  return data.map(brand => ({
    value: brand.brandId,
    label: brand.description,
    original: brand
  }));
};

export default class BrandSelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = false;
  }

  loadOptions(inputValue, callback) {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      api
        .post(
          `brands/brand/filtered/0/100/${this.props.active}`,
          inputValue || "",
          {
            headers: {
              "Content-Type": "text/plain"
            }
          }
        )
        .then(response => {
          callback(dataToSelectOptions(response.data));
        });
    }, 300);
  }
    
  render() {
    const { onChange, filter, ...rest } = this.props;

    return (
      <AsyncSelect
        defaultOptions
        cacheOptions
        placeholder="Searh brand"
        isClearable={true}
        loadOptions={this.loadOptions.bind(this)}
        menuPortalTarget={document.body}
        onChange={value => onChange(value ? value : null)}
        styles={{
          control: (base, state) => ({
            ...base,
            boxShadow: "none"
            // You can also use state.isFocused to conditionally style based on the focus state
          })
        }}
        {...rest}
      />
    );
  }
}
