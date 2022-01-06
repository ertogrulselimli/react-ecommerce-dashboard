import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import * as alertActions from "../../redux/actions/alert-actions";


class RequestErrorMessage extends React.Component {


    render() {

        console.log(this.props);
        const {requestError} = this.props.alert;

        return (
            <SweetAlert
                show={!!requestError}
                error
                confirmBtnText="Ok"
                confirmBtnBsStyle="danger"
                btnSize="xs"
                title=""
                onConfirm={this.props.alertActions.closeRequestAlert}
                onCancel={this.props.alertActions.closeRequestAlert}
            >
                <strong>{requestError ? requestError.message:  null}</strong>
                <p>
                {requestError ? requestError.errors: null}
                </p>
            </SweetAlert>
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
        alertActions: bindActionCreators(alertActions, dispatch)
    }
}


export default connect(mapStoreToProps, mapDispatchToProps)(RequestErrorMessage);



