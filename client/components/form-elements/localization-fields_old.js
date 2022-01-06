import React from 'react'
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl'
import FieldsErrorMessages from "../../components/validation/FieldsErrorMessages";


const messages = defineMessages({
    keyPlaceholder: {
        id: 'localizaion.form.lang_key.placeholder',
        defaultMessage: 'key'
    },
    valuePlaceholder: {
        id: 'localizaion.form.lang_value.placeholder',
        defaultMessage: 'value'
    },
    duplicateKeyErrorMsg: {
        id: 'localizaion.form.error.duplicate_key',
        defaultMessage: 'This language key already exists'
    },
    keyNotAllowedKeyErrorMsg: {
        id: 'localizaion.form.error.key_not_allowed',
        defaultMessage: 'Language key not valid.'
    }
})

class FormFields extends React.Component {

    constructor(props) {
        super(props);
        const initalData = props.data || {};
        this.state = {
            form: {
                language: initalData.language || '',
                translation: initalData.translation || ''
            }
        }
    }

    componentDidMount() {
        if (this.props.edit) {
            this.valueInput.focus()
        }
    }

    handleChangeInput(e) {
        let name = e.target.name;
        let value = name === 'language' ? e.target.value.toLowerCase(): e.target.value;

        this.setState(state => state.form[name] = value)
    }

    submit(e) {
        //TODO validate duplicate keys
        this.props.submit({...this.state.form})
    }

    handleEnter(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.submit()
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <div className="form-group">
                        {
                            !this.props.edit ? <input
                                type="text"
                                disabled={this.props.edit}
                                className="form-control"
                                name="language"
                                onKeyDown={this.handleEnter.bind(this)}
                                value={this.state.form.language}
                                placeholder={this.props.intl.formatMessage(messages.keyPlaceholder)}
                                onChange={this.handleChangeInput.bind(this)}
                            /> : <div className="pl-2">{this.state.form.language}</div>
                        }

                        <FieldsErrorMessages
                            show={this.props.error}
                            messages={[this.props.error]}
                        />


                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <input
                            ref={e => this.valueInput = e}
                            type='text'
                            className="form-control"
                            onKeyDown={this.handleEnter.bind(this)}
                            name="translation"
                            value={this.state.form.translation}
                            placeholder={this.props.intl.formatMessage(messages.valuePlaceholder)}
                            onChange={this.handleChangeInput.bind(this)}/>
                    </div>
                </div>
                <div className="col-3 mt-1">
                    <button type="button" className="btn btn-circle btn-sm btn-outline-secondary"
                            onClick={this.submit.bind(this)}>
                        <i className={this.props.edit ? "fa fa-save" : "fa fa-plus" }/>
                    </button>
                </div>
            </div>
        )
    }
}


class LocalizationFields extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            edited: {}
        }
    }

    add(value) {
        //check duplication language key
        if(this.props.values.map( v => v.language).includes(value.language)){
           return this.setState({errorMsg: this.props.intl.formatMessage(messages.duplicateKeyErrorMsg)})
        }

        //allow only az and ru
        if(!['az', 'ru'].includes(value.language)){
           return this.setState({errorMsg: this.props.intl.formatMessage(messages.keyNotAllowedKeyErrorMsg)})
        }

        //set intial defalt deault
        if(!this.props.values.length) value.default = true;


        this.setState({errorMsg: null});
        this.props.onValueChange([...this.props.values, value])
    }


    edit(value) {
        this.setState(state => {
            state.edited[value.language] = true;
            return state;
        })
    }

    remove(value) {
        let values = this.props.values.slice();
        values.splice(values.findIndex(v => v.language === value.language), 1);
        this.props.onValueChange(values)

    }

    update(value) {
        let values = this.props.values.slice();
        values[values.findIndex(v => v.language === value.language)] = value;

        this.props.onValueChange(values);
        this.setState(state => {
            state.edited[value.language] = false
            return state
        })
    }

    setDefault(index) {
        let newValues = this.props.values.map(value => {
            value.default = false;
            return value
        });

        newValues[index].default = true;
        this.props.onValueChange(newValues);

    }

    render() {

        const keys = this.props.values.map(value => value.language)

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        {
                            this.props.values.map((value, key) => {

                                    if (this.state.edited[value.language]) {
                                        return (
                                            <FormFields
                                                edit={true}
                                                key={key}
                                                intl={this.props.intl}
                                                submit={this.update.bind(this)}
                                                data={{...value}}
                                            />

                                        )
                                    } else {
                                        return (
                                            <div className="row mt-1" key={key}>
                                                <div className="col-3 pl-4">{value.language}</div>
                                                <div className="col-6">{value.translation}</div>
                                                <div className="col-3">

                                                    <button type="button"
                                                            className="btn btn-sm btn-circle btn-outline-secondary"
                                                            onClick={this.edit.bind(this, value)}>
                                                        <i className="fa fa-edit"/>
                                                    </button>

                                                    <button type="button"
                                                            className="ml-1 btn btn-sm btn-circle btn-outline-danger"
                                                            onClick={this.remove.bind(this, value)}>
                                                        <i className="fa fa-times"/>
                                                    </button>

                                                    <div className="form-check d-inline-block c-pointer" title="default">
                                                        <input type="radio" className="custom-radio  c-pointer"
                                                               checked={value.default || false}
                                                               onChange={this.setDefault.bind(this, key)}/>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    }

                                }
                            )
                        }
                    </div>
                    <div className="col-12">
                        <hr/>
                        <FormFields
                            error={this.state.errorMsg}
                            langKeys={keys}
                            intl={this.props.intl}
                            submit={this.add.bind(this)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default injectIntl(LocalizationFields)