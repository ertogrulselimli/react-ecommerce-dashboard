import React, {Component} from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import ProductForm from './product-form'


export default class ProductApproveViewModal extends Component {


    render() {


        return (

            <Modal
                size="lg"
                isOpen={true}
                toggle={this.props.close}
                className="modal-content-big"
            >
                <ModalBody>
                    <ProductForm {...this.props}/>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="default"
                        onClick={this.props.close}
                    >
                        Close
                    </Button>
                    <Button
                        type="button"
                        color="success"
                        onClick={this.props.approve}
                    >
                        Approve
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
