import React from 'react';
import api from '../../../../api'
import AsyncSelect from 'react-select/lib/Async';


export const dataToSelectOptions = (data)=>{
    return data.map(c => ({value: c.id, label: c.description, original: c}))
};


export default class UnitOfMeasurementSelectInput extends React.Component {

    constructor(props) {
        super(props);
        this.timeout = false;
    }


    loadOptions(inputValue, callback) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            api.post(`measure-units/filtered/0/100/${this.props.active}`, inputValue || "", {
                headers: {
                    'Content-Type': 'text/plain'
                }
            }).then(response => {
                callback(dataToSelectOptions(response.data))
            });
        }, 300)
    }


    render() {
        const {value, onChange, ...props} = this.props
        return (
            <AsyncSelect
                defaultOptions
                cacheOptions
                placeholder="Search units"
                isClearable={true}
                loadOptions={this.loadOptions.bind(this)}
                menuPortalTarget={document.body}
                onChange={value =>{
                    onChange(value ? value : null)
                }}
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


