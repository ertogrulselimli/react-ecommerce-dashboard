import React, {useState} from 'react'
import FilterInput from '../../../../components/form-elements/filter-input'
import CategoryFilterInput from '../../catalog/components/category-filter-input'


export default props => {

    if (props.hide) return null;

    return (
        <div className='row'>
            <div className="col-3">
                <div className="form-group">
                    <label>Select Category</label>
                    <CategoryFilterInput filter={{concrete:false,active:'YES'}}
                        onChange={category => {
                            props.onChange('categoryId', category ? category.value : null)
                        }}/>
                </div>
            </div>
            <div className="col-3">
                <div className="form-group">
                    <label>Search item name</label>
                    <FilterInput
                        onChange={value => {
                            props.onChange('filter', value)
                        }}
                        timeout={500}/>
                </div>
            </div>

            <div className="col-2">
                <div className="form-group">
                    <label>Active</label>
                    <select
                        className="form-control"
                        name='active'
                        value={props.filter.active}
                        onChange={e => {
                            props.onChange('active', e.target.value)
                        }}>
                        <option value='ALL'>ALL</option>
                        <option value='YES'>YES</option>
                        <option value='NO'>NO</option>
                    </select>
                </div>
            </div>
        </div>
    )
}