/**
 * Created by Artoghrul Salimli on 3/4/2019.
 */
import React from 'react';
import api from '../../../../api'
import AsyncSelect from 'react-select/lib/Async';


let timeout = false;

export default class ShopFilterInput extends React.Component {


    loadOptions(inputValue, callback) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            api.post(`shop/shops/filtered/0/100`, inputValue || ''
            ,{ headers: {
                'Content-Type': 'text/plain'
            }}).then(response => {
                callback(response.data.map(c => ({value: c.id, label: c.description})))
            });
        }, 300)
    }

    render() {

        const {value, onChange, ...props} = this.props;

        return (
            <AsyncSelect
                defaultOptions
                cacheOptions
                placeholder="Searh shop"
                isClearable={true}
                loadOptions={this.loadOptions.bind(this)}
                menuPortalTarget={document.body}
                onChange={value => onChange(value ? value : null)}
                value={value}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        boxShadow: "none"
                        // You can also use state.isFocused to conditionally style based on the focus state
                    })
                }}
                {...props}
            />
        );
    }
}



