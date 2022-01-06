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
import URLSearchParams from '@ungap/url-search-params'
import {Field, Formik, FieldArray} from 'formik';
import validationMessages from '../../messages/validation'
import api from '../../api'


const messages = defineMessages({
    updatePasswordButton: {
        id: 'reset_password.reset_password_button',
        defaultMessage: 'Update password'
    },
    updatedSuccessMsg: {
        id: 'reset_password.updated_success_msg',
        defaultMessage: 'Password updated successfully'
    }

});


class ResetPassword extends React.Component {


    constructor(props) {
        super(props);

        this.queryParams = new URLSearchParams(props.location.search);

        this.validation = yup.object().shape({
            newPassword: yup.string().required(props.intl.formatMessage(validationMessages.required)),
            confirmPassword: yup.string().required(props.intl.formatMessage(validationMessages.required)).oneOf([yup.ref("newPassword")], props.intl.formatMessage(validationMessages.confirmPassword))
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

        api.post('vendors/manager/password-reset/finish', values).then(response => {
            this.setState(state => {
                state.alert = {
                    isOpen: true,
                    type: 'success',
                    message: this.props.intl.formatMessage(messages.updatedSuccessMsg)
                };
                state.loading = false
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
                                <FormattedMessage id="reset_password.page_title" defaultMessage="RESET PASSWORD"/>
                            </CardTitle>

                            <Alert color={this.state.alert.type} isOpen={this.state.alert.isOpen}>
                                {this.state.alert.message}
                                <div>
                                    {this.state.alert.type === 'success' ?
                                        <Link to="/sign-in">
                                            <FormattedMessage id="reset_password.sign_in" defaultMessage="Sign in"/>
                                        </Link> : null}
                                </div>
                            </Alert>


                            <Formik
                                initialValues={{
                                    key: this.queryParams.get('key'),
                                    newPassword: '',
                                    confirmPassword: ''

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
                                                        <FormattedMessage id="reset_password.password.label"
                                                                          defaultMessage="New password"/>
                                                    </label>
                                                    <Field
                                                        autoComplete="off"
                                                        type="password"
                                                        className="form-control"
                                                        name="newPassword"
                                                    />

                                                    <FieldsErrorMessages
                                                        show={props.errors.newPassword}
                                                        messages={[props.errors.newPassword]}
                                                    />

                                                </div>


                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <FormattedMessage id="reset_password.confirm_password.label"
                                                                          defaultMessage="Confirm password"/>
                                                    </label>
                                                    <Field
                                                        autoComplete="off"
                                                        type="password"
                                                        className="form-control"
                                                        name="confirmPassword"
                                                    />
                                                    <FieldsErrorMessages
                                                        show={props.errors.confirmPassword}
                                                        messages={[props.errors.confirmPassword]}
                                                    />
                                                </div>


                                                <button
                                                    type="submit"
                                                    className={btnClasses}
                                                >
                                                    {this.state.loading ? '....' : intl.formatMessage(messages.updatePasswordButton)}
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
    return {
        alert: state.alert
    }
}


function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}


ResetPassword = connect(mapStoreToProps, mapDispatchToProps)(ResetPassword);


export default injectIntl(ResetPassword);
