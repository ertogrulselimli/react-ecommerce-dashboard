import React, {useState} from 'react'
import DateInput from '../../../../components/form-elements/date-input'
import CategoryFilterInput from '../../catalog/components/category-filter-input'


export default props => {

    if (props.hide) return null;

    return (
        <div className='row'>
            <div className="col-3">
                <div className="form-group">
                    <label>Select Category</label>
                    <CategoryFilterInput
                        filter={{
                            active: "ALL",
                            concrete: null,
                            filter: ''
                        }}
                        onChange={category => {
                            props.onChange('categoryId', category ? category.value : null)
                        }}/>
                </div>
            </div>

            <div className="col-3">
                <DateInput
                    label='Start Date'
                    value={props.filter.startDate}
                    onChange={date => {
                        console.log(date);
                        props.onChange('startDate', date)
                    }}
                />
            </div>

            <div className="col-3">
                <DateInput
                    label='End Date'
                    disableDate={props.filter.startDate}
                    value={props.filter.endDate}
                    onChange={date => {
                        props.onChange('endDate', date)
                    }}
                />
            </div>


        </div>
    )
}