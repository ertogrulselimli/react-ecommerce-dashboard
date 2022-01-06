import React from 'react'
import * as yup from 'yup'
import FieldsErrorMessages from "../../components/validation/FieldsErrorMessages";
import classnames from "classnames";
import {Card, CardBody, CardTitle, Alert} from 'reactstrap';
import * as authActions from '../../redux/actions/auth-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {injectIntl, FormattedMessage, defineMessages} from 'react-intl';
import {Link} from 'react-router-dom';
import {Field, Formik, FieldArray} from 'formik';
import validationMessages from '../../messages/validation'
import api from '../../api'


const messages = defineMessages({
    successMsg: {
        id: 'email_password_reset_code.success_msg',
        defaultMessage: 'Code sent. Please check email address'
    }
});


class EmailPasswordResetCode extends React.Component {


    constructor(props) {
        super(props);

        this.validation = yup.object().shape({
            email: yup.string().email(props.intl.formatMessage(validationMessages.email)).required(props.intl.formatMessage(validationMessages.required)),
        });

        this.state = {
            loading: false,
            alert: {
                isOpen: false,
                type: 'danger'
            }
        }
    }

    submit(values) {
        if (this.state.loading) return;
        this.setState({loading: true});

        api.post('vendors/manager/password-reset/init', values).then(response => {
            this.setState(state => {
                state.alert = {
                    isOpen: true,
                    type: 'success',
                    message: this.props.intl.formatMessage(messages.successMsg)
                };
                state.loading = false;
                return state
            })
        }).catch(error => {
            const message = error.response && error.response.data.message ? error.response.data.message : 'something went wrong'

            this.setState(state => {
                state.alert = {
                    isOpen: true,
                    type: 'danger',
                    message
                };
                state.loading = false

                return state
            })
        });

    }


    render() {

        let btnClasses = classnames([
            "btn btn-primary block full-width m-b btn-block",
            {
                disabled: this.state.loading
            }
        ]);

        const intl = this.props.intl;

        return (
            <div className="d-flex justify-content-center align-items-lg-center pt-4" style={{height: '100vh'}}>

                <div style={{width: '400px'}}>
                    <Card>
                        <CardBody className="px-5 pb-5">
                            <CardTitle className="text-center">
                                <FormattedMessage id="email_password_reset_code.page_title"
                                                  defaultMessage="RESET PASSWORD"/>
                            </CardTitle>

                            <Alert color={this.state.alert.type} isOpen={this.state.alert.isOpen}>
                                {this.state.alert.message}
                            </Alert>


                            <Formik
                                initialValues={{
                                    email: ''
                                }}
                                onSubmit={this.submit.bind(this)}
                                validationSchema={this.validation}
                            >
                                {
                                    (props) => {

                                        return (
                                            <form onSubmit={props.handleSubmit} autoComplete="off">

                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="email_password_reset_code.email.label"
                                                                          defaultMessage="Email"/>
                                                    </label>
                                                    <Field
                                                        autoComplete="off"
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                    />

                                                    <FieldsErrorMessages
                                                        show={props.errors.email}
                                                        messages={[props.errors.email]}
                                                    />

                                                </div>

                                                <button
                                                    type="submit"
                                                    className={btnClasses}
                                                >
                                                    {this.state.loading ? '....' :
                                                        <FormattedMessage id="email_password_reset_code.send_button"
                                                                          defaultMessage="Send"/>
                                                    }
                                                </button>

                                            </form>
                                        )
                                    }
                                }
                            </Formik>

                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
}


function mapStoreToProps(state) {
    return {}
}


function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}


EmailPasswordResetCode = connect(mapStoreToProps, mapDispatchToProps)(EmailPasswordResetCode);


export default injectIntl(EmailPasswordResetCode);
