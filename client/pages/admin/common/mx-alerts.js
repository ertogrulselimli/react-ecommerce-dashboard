/**
 * Created by Administrator on 4/14/2019.
 */
import SweetAlert from "react-bootstrap-sweetalert";
import {Alert} from 'reactstrap'

import React from 'react'


export default class MXAlerts extends React.Component{
    constructor(props){
        super(props);

        this.toggleAlert=this.toggleAlert.bind(this);
        this.toggleSweetAlert=this.toggleSweetAlert.bind(this);
    }


    toggleAlert(){
       this.props.toggleAlert();
    }


    toggleSweetAlert(){
       this.props.toggleSweetAlert();
    }


    render(){

        return (
            <React.Fragment>
        <Alert
            type="success"
            isOpen={!!this.props.alertMessage}
            toggle={this.toggleAlert}
        >
            {this.props.alertMessage}
        </Alert>

        <SweetAlert
        show={!!this.props.sweetAlertMessage}
        error
        confirmBtnText="Ok"
        confirmBtnBsStyle="danger"
        btnSize="xs"
        title="Error message"
        onConfirm={this.toggleSweetAlert}
        onCancel={this.toggleSweetAlert}
       >
         {this.props.sweetAlertMessage}
    </SweetAlert>
   </React.Fragment>
    )

    }

}