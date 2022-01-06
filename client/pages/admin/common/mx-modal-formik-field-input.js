/**
 * Created by Administrator on 4/10/2019.
 */
import React from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import SelectFromTgTable from './select-from-table'
import PropTypes from 'prop-types'


class MXModalFormikFieldInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showModal:false,
        }

        this.toggle=this.toggle.bind(this);
        this.onSelectEntity=this.onSelectEntity.bind(this);
    }


    toggle(){
        this.setState((prevState)=>({
            showModal:!prevState.showModal
        }))
    }


    onSelectEntity(entity){
        this.props.formik.setFieldValue(this.props.fieldId, entity.id);
        this.props.formik.setFieldValue(this.props.fieldDescription, entity.description);
        this.setState({
            showModal:false,
        })
    }



    render(){
        const formik=this.props.formik;
        const modalHeader=this.props.modalHeader;

        if(this.props.showInput===false){
            return null;
        }

        return (
        <React.Fragment>
           <div className={this.props.divClassName||"form-group"}>
               <label className={this.props.labelClassName||"control-label"}>
                   {this.props.intl.formatMessage({
                       id:this.props.intlMessageId,
                       defaultMessage:this.props.intlDefaultMessage
                   })}
               </label>
                <div className="input-group">
                    <input
                        className={this.props.fieldClassName||"form-control"}
                        disabled={true}
                        value={formik.values[this.props.fieldDescription]}
                    />
                    <div
                        className="input-group-prepend c-pointer"
                        onClick={this.toggle}
                    >
                    <span className="input-group-text">
                      <i className="fa fa-edit"/>
                    </span>
                    </div>
                </div>
           </div>

                <Modal
                    isOpen={this.state.showModal}
                    toggle={this.toggle}
                    size={this.props.modalSize||"lg"}
                    className={this.props.modalClassName||"modal-content-big"}
                >
                    <ModalHeader>{modalHeader}</ModalHeader>
                    <ModalBody>
                        <SelectFromTgTable
                            onSelectEntity={this.onSelectEntity}
                            filterUrl={this.props.filterUrl}
                            columns={this.props.columns}
                            additionalFilters={this.props.additionalFilters}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="button"
                            color="default"
                            onClick={this.toggle}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
       </React.Fragment>

        )
    }
}

MXModalFormikFieldInput.propTypes={
    divClassName:PropTypes.string,
    labelClassName:PropTypes.string,
    fieldClassName:PropTypes.string,
    intlMessageId:PropTypes.string,
    intlDefaultMessage:PropTypes.string,
    fieldId:PropTypes.string,
    fieldDescription:PropTypes.string,
    showInput:PropTypes.bool,
    modalSize:PropTypes.string,
    modalClassName:PropTypes.string
}

export  default MXModalFormikFieldInput;