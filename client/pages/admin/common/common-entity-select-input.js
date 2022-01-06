/**
 * Created by Administrator on 4/3/2019.
 */

import React from "react";
import api from '../../../api'
import AsyncSelect from "react-select/lib/Async";

export default   class CommonSelectInput extends  React.Component {

        constructor(props){
            super(props);
            this.timeout=false;
        }


        loadOptions(inputValue, callback) {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                api.post(this.props.filterUrl,{
                    ...this.props.filters,
                    filter: inputValue || '',
                    active: 'YES'
                    }
                    ).then(response => {
                    callback(response.data.content.map(c => ({value: c.id, label: c.description})))
                });
            }, 300)
        }


        render(){
            const {value, onChange, ...props} = this.props;
            return (

                <AsyncSelect
                    defaultOptions
                    cacheOptions
                    placeholder={this.props.placeholder}
                    isClearable={true}
                    loadOptions={this.loadOptions.bind(this)}
                    menuPortalTarget={document.getElementById('portal-target')}
                    onChange={value => onChange(value ? value : null)}
                    value={value}
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            boxShadow: "none"
                            // You can also use state.isFocused to conditionally style based on the focus state
                        }),
                        menuPortal: styles => ({ ...styles, zIndex: 1052 })
                    }}
                    {...props}
                />

            );
        }
    }

