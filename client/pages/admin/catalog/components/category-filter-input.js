import React from 'react';
import api from '../../../../api'
import AsyncSelect from 'react-select/lib/Async';
import {displayName} from '../../../../helpers'


export const dataToSelectOptions = (data)=>{
    return data.map(c => ({value: c.id, label: displayName(c.displayName), original: c}))
};


export default class CategoryFilterInput extends React.Component {

    constructor(props) {
        super(props);
        this.timeout = false
    }


    loadOptions(inputValue, callback) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            api.post(`catalog/categories/filtered/?page=0&size=20`, {
                ...this.props.filter,
                filter: inputValue || ''
            }).then(response => {
                callback(dataToSelectOptions(response.data.content))
            });
        }, 300)
    }


    render() {

        const {filter, onChange, ...rest} = this.props;

        return (
            <AsyncSelect
                defaultOptions
                cacheOptions
                placeholder="Searh category"
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
                {...rest}
            />
        );
    }
}


CategoryFilterInput.defaultProps = {
    filter: {
        active: "YES",
        filter: '',
        concrete: true
    }
};

