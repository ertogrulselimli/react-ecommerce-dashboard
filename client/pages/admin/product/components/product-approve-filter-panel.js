import React, {useState} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu} from 'reactstrap';
import DateInput from '../../../../components/form-elements/date-input'


export default props => {

    const [showColumnsFilter, toggleColumnsFilter] = useState(false);
    if (props.hide) return null;

    return (
        <div className='row'>
            <div className="col-1" style={{paddingTop: '30px'}}>
                <Dropdown
                    isOpen={showColumnsFilter}
                    toggle={() => {
                        toggleColumnsFilter(!showColumnsFilter)
                    }}
                >
                    <DropdownToggle
                        color="default"
                        caret>
                        <i className="fa fa-filter"/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <ul className="list-group">
                            {
                                Object.keys(props.columns).map((col, index) => (
                                    <li
                                        className="list-group-item py-0 px-1"
                                        key={index}
                                    >
                                        <label
                                            className="d-flex align-items-center m-0"
                                            htmlFor={`col${index}`}>
                                            <input
                                                type="checkbox"
                                                checked={props.columns[col]}
                                                id={`col${index}`}
                                                onChange={e => {
                                                    props.onFilterColumn(col, e.target.checked)
                                                }}
                                            />&nbsp;
                                            {col}
                                        </label>
                                    </li>
                                ))
                            }
                        </ul>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <div className="col-3">
                <DateInput
                    label='Start Created Date'
                    value={props.filter.startCreatedDate}
                    onChange={date => {
                        props.onChange('startCreatedDate', date)
                    }}
                />
            </div>
            <div className="col-3">
                <DateInput
                    label='End Created Date'
                    disableDate={props.filter.startCreatedDate}
                    value={props.filter.endCreatedDate}
                    onChange={date => {
                        props.onChange('endCreatedDate', date)
                    }}
                />
            </div>

        </div>
    )
}