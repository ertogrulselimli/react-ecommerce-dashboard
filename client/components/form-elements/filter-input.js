import React from 'react'


export default class FilterInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.initalValue || ''
        };
        this.timeout = false
    }


    onInputChange(e) {
        let value = e.target.value;
        if (this.timeout) clearTimeout(this.timeout);
        this.setState({value});
        //
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

        if (this.props.hide) return null;

        return (
            <div className="form-group">
                {this.props.label ? <label>{this.props.label}</label> : null}
                <div className="input-group">
                    <div className="input-group-prepend c-pointer"
                         onClick={() => this.props.onChange(this.state.value)}>
                        <span className="input-group-text"><i className="fa fa-filter"/></span>
                    </div>
                    <input
                        className="form-control"
                        placeholder="search"
                        onChange={this.onInputChange.bind(this)}
                        onKeyDown={this.onKeyDown.bind(this)}
                        value={this.state.value}
                    />
                </div>
            </div>
        )
    }

}
