import React from 'react'


export default class FileInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filename: this.props.filename || ''
        }
    }

    onClickButton() {
        this.fileInput.click()
    }

    onInputChange(e) {
        let file = e.target.files[0];

        this.setState({filename: file.name});
        const _this = this;

        if (file && window.FileReader) {
            const reader = new FileReader();

            reader.onload = function (e) {
                _this.props.onChange(e.target.result, file.name)

            }.bind(this);

            reader.readAsDataURL(file);
        }
    }


    render() {

        return (

            <div>
                <button className={this.props.className} onClick={ this.onClickButton.bind(this) }>
                    { this.props.label }
                </button>

                <input
                    type="file"
                    style={{display: 'none'}}
                    ref={ e => this.fileInput = e}
                    onChange={this.onInputChange.bind(this)}
                    accept={this.props.accept}
                />
            </div>
        )

    }


}
