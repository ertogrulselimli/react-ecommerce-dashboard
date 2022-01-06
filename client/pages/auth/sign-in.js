import React from "react";
import validation from "../../components/validation/validation";
import FieldsErrorMessages from "../../components/validation/FieldsErrorMessages";
import classnames from "classnames";
import { Card, CardBody, CardTitle, Alert } from "reactstrap";
import * as authActions from "../../redux/actions/auth-actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { injectIntl, FormattedMessage, defineMessages } from "react-intl";
import { Link } from "react-router-dom";

const messages = defineMessages({
  placeholderUsername: {
    id: "signin.placeholder.username",
    defaultMessage: "Usename"
  },
  placeholderPassword: {
    id: "signin.placeholder.password",
    defaultMessage: "Password"
  },
  signinButton: {
    id: "signin.signin_button",
    defaultMessage: "Log In"
  }
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      requestErrorMsg: null
    };

    let rules = {
      username: "required",
      password: "required"
    };

    this.validation = new validation(rules, {
      username: this.state.email,
      password: this.state.password
    });
  }

  inputChange(e) {
    let field = e.target.name;
    let value = e.target.value;

    this.validation.validate(field, value);
    this.setState({ [field]: value, requestErrorMsg: null });
  }

  submit() {
    if (this.state.loading) return;

    if (this.validation.isValid()) {
      this.setState({ loading: true, showErrorMsg: false });

      this.props.authActions
        .login({
          password: this.state.password,
          username: this.state.username
        })
        .then(response => {})
        .catch(error => {
          this.setState({
            requestErrorMsg: error.response.data.message,
            loading: false
          });
        });
    } else {
      this.setState({ showErrorMsg: true });
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.submit();
    }
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
      <div
        className="d-flex justify-content-center align-items-lg-center pt-4"
        style={{ height: "100vh" }}
      >
        <div style={{ width: "400px" }}>
          <Card>
            <CardBody className="px-5 pb-5">
              <CardTitle className="text-center">ADMIN</CardTitle>

              <Alert color="danger" isOpen={!!this.state.requestErrorMsg}>
                {this.state.requestErrorMsg}
              </Alert>

              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.fd}
                    onKeyDown={this.onKeyDown.bind(this)}
                    placeholder={intl.formatMessage(
                      messages.placeholderUsername
                    )}
                    onChange={this.inputChange.bind(this)}
                  />
                </div>

                <FieldsErrorMessages
                  show={this.state.showErrorMsg}
                  messages={this.validation.getMessages("username")}
                />
              </div>

              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-lock" />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onKeyDown={this.onKeyDown.bind(this)}
                    placeholder={intl.formatMessage(
                      messages.placeholderPassword
                    )}
                    onChange={this.inputChange.bind(this)}
                  />
                </div>
                <FieldsErrorMessages
                  show={this.state.showErrorMsg}
                  messages={this.validation.getMessages("password")}
                />
                {/*<Link to='/password/send-code' style={{fontSize: '13px'}}>forgot password</Link>*/}
              </div>

              <button className={btnClasses} onClick={this.submit.bind(this)}>
                {intl.formatMessage(messages.signinButton)}
              </button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

function mapStoreToProps(state) {
  return {
    alert: state.alert
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

SignIn = connect(
  mapStoreToProps,
  mapDispatchToProps
)(SignIn);

export default injectIntl(SignIn);
