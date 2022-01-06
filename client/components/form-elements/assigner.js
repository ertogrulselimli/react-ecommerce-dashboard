import React from 'react'
import {FormattedMessage} from 'react-intl';

const AssignerItems = props => {

    if (!props.data.length) {
        if (props.available) {
            return (
                <li className="list-group-item text-center">
                    <p>
                        <FormattedMessage
                            id="form.assinger.available_data_not_found"
                            defaultMessage="Available data not found"
                        />
                    </p>
                </li>
            )
        } else {
            return (
                <li className="list-group-item text-center">
                    <p>
                        <FormattedMessage
                            id="form.assinger.assigned_data_not_found"
                            defaultMessage="Not data assigned yet"
                        />
                    </p>
                </li>
            )
        }
    }

    const icon = props.available ? 'fa fa-link' : 'fa fa-times';
    const buttonClass = props.available ? 'btn-outline-success' : 'btn-outline-danger';

    return (
        <>
        {
            props.data.map((value, key) => (
                <li className="list-group-item d-flex" key={key}>
                    <div style={{flex: 5}}>
                        {value[props.valueKey]}
                        <p className="font-sm">
                            {value[props.descriptionKey]}
                        </p>
                    </div>
                    <div className="align-self-center" style={{flex: 1}}>
                        <button type="button" className={"btn btn-circle pull-right btn-sm " + buttonClass}
                                onClick={() => {
                                    props.onClickButton(value)
                                }}>
                            <i className={icon}/>
                        </button>
                    </div>
                </li>
            ))
        }
        </>
    )
};


export default class Assigner extends React.Component {

    assign(value) {
        this.props.onValueChange([...this.props.assignedData, value])
    }

    unassign(value) {
        const primaryKey = this.props.primaryKey;
        const values = this.props.assignedData.slice();
        values.splice(this.props.assignedData.findIndex(assigned => assigned[primaryKey] === value[primaryKey]), 1);
        this.props.onValueChange(values)

    }

    unAssingedData() {
        const primaryKey = this.props.primaryKey;
        return this.props.availableData.filter(available => this.props.assignedData.findIndex(assigned => available[primaryKey] === assigned[primaryKey]) === -1)
    }

    render() {


        return (
            <div className="row">
                <div className="col-6">
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-secondary">
                            <FormattedMessage id="form.assinger.assigned" defaultMessage="Assigned"/>
                        </li>


                        <AssignerItems
                            {...this.props}
                            onClickButton={this.unassign.bind(this)}
                            data={this.props.assignedData}
                        />
                    </ul>

                </div>
                <div className="col-6">
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-secondary">
                            <FormattedMessage id="form.assinger.available" defaultMessage="Available"/>
                        </li>
                        <AssignerItems
                            {...this.props}
                            onClickButton={this.assign.bind(this)}
                            data={this.unAssingedData()}
                            available
                        />
                    </ul>

                </div>
            </div>
        )
    }

}