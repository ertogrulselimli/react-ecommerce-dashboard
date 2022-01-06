import React from "react";
import { Switch, Router, Route } from "react-router-dom";
import { hot, setConfig } from "react-hot-loader";

setConfig({
  ignoreSFC: true, // RHL will be __completely__ disabled for SFC
  pureRender: true // RHL will not change render method
});

import PrivateRoute from "./components/route/private-route";
import * as authActions from "./redux/actions/auth-actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import history from "./components/route/history";
import Loadable from "react-loadable";
import CenterCircularProgress from "./components/ui-elements/center-circular-progress";
import { IntlProvider, addLocaleData } from "react-intl";
import az from "react-intl/locale-data/az";
import ru from "react-intl/locale-data/ru";
//add locale
import en from "react-intl/locale-data/en";

import localeDataAz from "./../public/locales/az.json";
import localeDataRu from "./../public/locales/ru.json";
//add locale json
import localeDataEn from "./../public/locales/en.json";

addLocaleData([...az, ...ru, ...en]);

//pages
import NotFond from "./pages/notfound";
const SignIn = Loadable({
  loader: () => import("./pages/auth/sign-in"),
  loading: CenterCircularProgress
});
const ResetPassword = Loadable({
  loader: () => import("./pages/auth/reset-password"),
  loading: CenterCircularProgress
});
const EmailPasswordResetCode = Loadable({
  loader: () => import("./pages/auth/email-password-reset-code"),
  loading: CenterCircularProgress
});
const AdminIndex = Loadable({
  loader: () => import("./pages/admin/admin-index"),
  loading: CenterCircularProgress
});

class App extends React.Component {
  componentDidMount() {
    this.props.authActions.getUserData();
    this.props.authActions.getLanguages();
  }

  render() {
    return (
      <IntlProvider
        locale={this.props.auth.language}
        messages={
          { az: localeDataAz, ru: localeDataRu, en: localeDataEn }[
            this.props.auth.language
          ]
        }
      >
        <Router history={history}>
          <Switch>
            <Route
              path="/sign-in"
              render={props => (
                <PrivateRoute {...props} component={SignIn} unauthorized />
              )}
            />
            <Route
              path="/password/send-code"
              render={props => (
                <PrivateRoute
                  {...props}
                  component={EmailPasswordResetCode}
                  unauthorized
                />
              )}
            />
            <Route
              path="/password/reset"
              render={props => (
                <PrivateRoute
                  {...props}
                  component={ResetPassword}
                  unauthorized
                />
              )}
            />
            <Route
              path="/dashboard"
              render={props => (
                <PrivateRoute {...props} component={AdminIndex} authorized />
              )}
            />
            <Route
              exact
              path="/"
              render={props => (
                <PrivateRoute {...props} component={AdminIndex} authorized />
              )}
            />
            <Route component={NotFond} />
          </Switch>
        </Router>
      </IntlProvider>
    );
  }
}

function mapStoreToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

App = connect(
  mapStoreToProps,
  mapDispatchToProps
)(App);

export default hot(module)(App);
