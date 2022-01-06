import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import * as AuthActions from '../../redux/actions/auth-actions'
import CenterCircularProgress from '../ui-elements/center-circular-progress'

class PrivateRoute extends React.Component {



    render() {

        const Component = this.props.component;

        if (this.props.auth.loggedIn === null) return <CenterCircularProgress show={true} size={60} portal delay='800'/>;
        if (this.props.authorized && this.props.auth.loggedIn === false) {
            return <Redirect to="/sign-in"/>
        }
        if (this.props.unauthorized && this.props.auth.loggedIn) {
            return <Redirect to="/dashboard"/>
        }

        return (
            <Component {...this.props}/>
        )
    }
}



function mapStoreToProps(state) {
    return {
        auth: state.auth
    }
}


function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(AuthActions, dispatch)
    }
}

PrivateRoute = connect(mapStoreToProps, mapDispatchToProps)(PrivateRoute);


export default PrivateRoute