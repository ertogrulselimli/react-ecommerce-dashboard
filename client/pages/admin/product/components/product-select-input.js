import React from 'react';
import api from '../../../../api'
import AsyncSelect from 'react-select/lib/Async';
import {displayName} from "../../../../helpers";


let timeout = false;

export default class ProductSelectInput extends React.Component {


    loadOptions(inputValue, callback) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            let filter = {...this.props.filter, filter: inputValue};
            api.post(`catalog/product/products/filtered?page=0&size=100`, filter).then(response => {
                callback(response.data.content.map(p => ({
                    value: p.id,
                    label: `${displayName(p.itemNameDisplayName)} ${p.model}`
                })))
            });
        }, 300)
    }


    render() {
        return (
            <AsyncSelect
                defaultOptions
                cacheOptions
                placeholder="Searh product"
                isClearable={true}
                loadOptions={this.loadOptions.bind(this)}
                onChange={value => this.props.onChange(value ? value : null)}
                value={this.props.value}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        boxShadow: "none"
                        // You can also use state.isFocused to conditionally style based on the focus state
                    })
                }}
                {...this.props}

            />
        );
    }
}


ProductSelectInput.defaultProps = {
    filter: {}
};


