import React from "react";
import Select from "react-select";



export default class extends React.Component {

    render() {
        return (
            <Select
                value={this.props.filter ? this.props.filter.value: null}
                isClearable={this.props.isClearable}
                menuPortalTarget={document.getElementById('portal-target')}
                onChange={value => this.props.onChange(value ? value : null)}
                options={this.props.options}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        boxShadow: "none"
                        // You can also use state.isFocused to conditionally style based on the focus state
                    }),
                    menuPortal: styles => ({ ...styles, zIndex: 1052 })
                }}
            />
        );
    }
}
