import React, {useState} from 'react'
import Select from "react-select";
import {displayName} from "../../../../helpers";
import UnitOfMeasurementSelectInput from '../../unit-of-measurement/components/unit-of-measurement-select-input'
import {Alert} from 'reactstrap';
import classnames from 'classnames';

export default class AttributeForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: {}
        }
    }


    add() {
        //check if unit already exists in list
        let exists = this.props.list.some(unit => unit.id === this.state.value.original.id);
        if (exists) {
            this.setState({alertMsg: 'This unit already exists in list'})
        } else {
            this.props.onChange([{...this.state.value.original, crud: 'i'}, ...this.props.list]);
            this.setState({value: {}});
            this.dismissAlert();
        }
    }



    remove(unit) {
        //do not allow remove if unit is used by attribute values
        let valuesHasThisUnit = this.props.attributeValues.filter(v => {
            return v.unitOfMeasurement && v.unitOfMeasurement.id === unit.id && v.crud !== 'd' && v.active !== false
        }).length;
        if (valuesHasThisUnit) {
            this.setState({alertMsg: `${valuesHasThisUnit} attribute values has this unit. Please change unit of those values before remove unit`})
        } else {
            let units = this.props.list.map(u => u.id === unit.id ? {...unit, crud: 'd', previousCrud: unit.crud} : u);
            this.props.onChange(units);
            this.dismissAlert();
        }
    }


    undo(unit) {
        let units = this.props.list.map(u => u.id === unit.id ? {...unit, crud: unit.previousCrud} : u);
        this.props.onChange(units);
    }


    dismissAlert() {
        this.setState({alertMsg: null})
    }


    render() {
        console.log(this.props);
        return (
            <div>
                <div className='row'>
                    <div className='col-12'>
                        <Alert color="danger" isOpen={!!this.state.alertMsg} toggle={this.dismissAlert.bind(this)}>
                            {this.state.alertMsg}
                        </Alert>
                    </div>
                    <div className="col-6">
                        <UnitOfMeasurementSelectInput
                            active="YES"
                            value={this.state.value}
                            onChange={options => {
                                this.setState({value: options})
                            }}
                        />
                    </div>

                    <div className="col-2">
                        <button type='button' className="btn btn-success btn-sm py-2" onClick={this.add.bind(this)}>
                            ADD
                        </button>
                    </div>
                </div>
                <hr/>

                {
                    this.props.list.map((unit, key) => (
                        <div className='row mb-2' key={key}>
                            <div className='col-6'>
                                {displayName(unit.displayName)}
                                {unit.crud === 'd' ? <span className='text-danger pl-1'>Deleted</span> : null}
                            </div>
                            <div className='col-2'>
                                <button
                                    type='button'
                                    className={classnames(["btn btn-danger btn-sm", {'d-none': unit.crud === 'd'}])}
                                    onClick={this.remove.bind(this, unit)}>
                                    <i className='fa fa-times'/> DELETE
                                </button>
                                <button
                                    type='button'
                                    className={classnames(["btn btn-primary btn-sm", {'d-none': unit.crud !== 'd'}])}
                                    onClick={this.undo.bind(this, unit)}>
                                    <i className='fa fa-undo'/> UNDO
                                </button>
                            </div>
                        </div>
                    ))

                }

            </div>
        )
    }

}

