import React from 'react';
import api from '../../../../api'
import AsyncSelect from 'react-select/lib/Async';

let timeout = false;

export default class ImportFileNameSelectInput extends React.Component {


    loadOptions(inputValue, callback) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            api.post(`impex/upload-files/filtered?page=0&size=100`, {...this.props.filter || {}}).then(response => {
                callback(response.data.content.map(i => ({value: i.id, label: i.fileName, original: i})))
            });
        }, 300)
    }


    render() {

        const {filter, onChange, ...props} = this.props;

        return (
            <AsyncSelect
                defaultOptions
                cacheOptions
                placeholder="Searh file name"
                isClearable={true}
                menuPortalTarget={document.body}
                loadOptions={this.loadOptions.bind(this)}
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

