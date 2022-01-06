/**
 * Created by Administrator on 4/5/2019.
 */

import React from 'react'

export default class MXTextFilterInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ''
        };
        this.timeout = false
    }


    onInputChange(e) {
        let value = e.target.value;
        if (this.timeout) clearTimeout(this.timeout);
        this.setState({value});
        this.timeout = setTimeout(() => {
            this.props.onChange(this.state.value)
        }, this.props.timeout)
    }

    onKeyDown(e) {
        if (e.keyCode === 13) {
            this.props.onChange(this.state.value)
        }
    }

    render() {
        return (
                    <input
                        type={this.props.type||"text"}
                        className="form-control"
                        onChange={this.onInputChange.bind(this)}
                        onKeyDown={this.onKeyDown.bind(this)}
                        value={this.state.value}
                    />

        )
    }

}