import React from 'react'
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import FieldsErrorMessages from "../validation/FieldsErrorMessages";


const messages = defineMessages({
    keyPlaceholder: {
        id: 'localizaion.form.lang_key.placeholder',
        defaultMessage: 'key'
    },
    valuePlaceholder: {
        id: 'localizaion.form.lang_value.placeholder',
        defaultMessage: 'translation'
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


class LocalizationFields extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        let values = this.props.auth.langs.map(lang => this.props.values.find(value => value.language === lang.code) || {
            language: lang.code,
            translation: '',
            default: lang.default
        });

        setTimeout(() => {
            this.props.onValueChange(values)

        }, 0)
    }

    onChange(index, e) {
        let value = e.target.value;
        let values = [...this.props.values];
        values[index].translation = value;

        this.props.onValueChange(values)
    }


    setDefault(index) {
        let values = this.props.values.map(value => {
            value.default = false
            return value
        });
        values[index].default = true;
        this.props.onValueChange(values)

    }

    getTranslation(language) {
        let value = this.props.values.find(value => value.language === language);
        return value ? value.translation : '';
    }

    isChecked(language) {
        let value = this.props.values.find(value => value.language === language);
        return (value && value.default) || language === 'az'
    }

    render() {


        return (
            <>
            {
                this.props.values.map((value, key) => {

                        return (
                            <div className="row mt-1" key={key}>
                                <div className="col-1 pt-1 pr-0 text-center"><b
                                    style={{color: 'rgba(0,0,0,0.7)'}}>{value.language}</b></div>
                                <div className="col-8">
                                    <input
                                        disabled={this.props.disabled}
                                        type='text'
                                        className="form-control"
                                        name="translation"
                                        value={value.translation || ''}
                                        placeholder={this.props.intl.formatMessage(messages.valuePlaceholder)}
                                        onChange={this.onChange.bind(this, key)}/>

                                    <FieldsErrorMessages
                                        show={value.language === 'az' && this.props.error}
                                        messages={[this.props.error]}
                                    />
                                </div>
                                <div className="col-3 pt-1">
                                    <div className="form-check">
                                        <input
                                            disabled={true}
                                            id={`default${key}`}
                                            type="checkbox"
                                            className="form-check-input c-pointer"
                                            checked={value.default}
                                            onChange={this.setDefault.bind(this, key)}/>

                                        <label className="form-check-label small c-pointer" htmlFor={`default${key}`}>
                                            Default
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )

                    }
                )
            }
            </>
        )
    }
}

function mapStoreToProps(state) {
    return {
        auth: state.auth
    }
}


function mapDispatchToProps() {
    return {}
}


LocalizationFields = connect(mapStoreToProps, mapDispatchToProps)(LocalizationFields);

export default injectIntl(LocalizationFields)