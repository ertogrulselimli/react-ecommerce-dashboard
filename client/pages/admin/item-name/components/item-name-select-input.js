import React from 'react';
import api from '../../../../api'
import AsyncSelect from 'react-select/lib/Async';
import PropTypes from 'prop-types'
import {displayName} from "../../../../helpers";

export const dataToSelectOptions = (data)=>{
    return data.map(c => ({value: c.id, label: c.description, original: c}))
};

let timeout = false;

export default class ItemNameSelectInput extends React.Component {

    loadOptions(inputValue, callback) {
        if(this.props.requestFilter && !this.props.requestFilter()){
            callback([])
        }

        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            api.post(`catalog/item-name/filtered/0/100`, {
                ...this.props.filter,
                filter: inputValue || ''
            }).then(response => {
                callback(dataToSelectOptions(response.data))
            });
        }, 300)
    }


    render() {
        const {filter, onChange, ...props} = this.props;
        return (
            <AsyncSelect
                defaultOptions
                cacheOptions
                placeholder="Searh item name"
                isClearable={true}
                ref={e => this.itemNameSelect = e}
                loadOptions={this.loadOptions.bind(this)}
                menuPortalTarget={document.body}
                onChange={value => this.props.onChange(value ? value : null)}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        boxShadow: "none"
                    })
                }}
                {...props}

            />
        );
    }
}


ItemNameSelectInput.defaultProps = {
    filter: {
        active: "YES",
        filter: '',
        concrete: true
    }
};

ItemNameSelectInput.propTypes = {
    onChange: PropTypes.func.isRequired
};


