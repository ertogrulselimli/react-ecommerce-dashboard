import React from 'react'
import {displayName} from '../../../../helpers'
import classnames from 'classnames'
import {Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import CategoryTree from './category-tree';
import PropTypes from 'prop-types';


export default class CategorySelectInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            selected: {
                category: {
                    [this.props.valueProperty]: props.value || null
                }
            }
        };
    }


    toggle() {

    }

    onClickCategory(params) {
        this.setState({selected: params})
    }

    select() {
        this.closeModal();
        if(this.state.selected.children){
            this.props.onChange(this.state.selected)
        }
    }

    showModal() {
        this.setState({showModal: true})
    }

    closeModal() {
        this.setState({showModal: false})
    }

    render() {

        if (this.props.hide) return null;

        return (
            <div className="c-pointer" style={{display: this.props.hide ? 'none' : 'block'}}>
                <div className="form-group">
                    <label className="control-label">
                        {this.props.label}
                    </label>
                    <div className="input-group">
                        <input
                            className="form-control"
                            disabled={true}
                            value={this.props.name}
                        />
                        <div className="input-group-prepend c-pointer" onClick={this.showModal.bind(this)}>
                            <span className="input-group-text"><i className="fa fa-edit"/></span>
                        </div>
                    </div>
                </div>


                <Modal isOpen={this.state.showModal} toggle={this.closeModal.bind(this)}>
                    <ModalHeader toggle={this.closeModal.bind(this)}><div>Category hierarchy</div></ModalHeader>
                    <ModalBody>
                        <CategoryTree
                            valueProperty={this.props.valueProperty}
                            categories={this.props.categories}
                            selected={this.state.selected.category[this.props.valueProperty]}
                            onClick={this.onClickCategory.bind(this)}
                            onFound={this.props.onFound}
                            concrete={this.props.concrete}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button type='button' color="default" onClick={this.closeModal.bind(this)}>Cancel</Button>
                        <Button type='button' color="success" onClick={this.select.bind(this)}>Select</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


CategorySelectInput.propTypes = {
    // code: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    categories: PropTypes.array,
    onFound: PropTypes.func
}



