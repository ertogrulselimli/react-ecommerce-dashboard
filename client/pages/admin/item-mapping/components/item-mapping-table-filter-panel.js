import React, {useState} from 'react'
import CategoryFilterInput from '../../catalog/components/category-filter-input'
import ItemNameSelectInput from '../../item-name/components/item-name-select-input'


export default props => {

    if (props.hide) return null;

    return (
        <div className='row'>
            <div className="col-4">
                <div className="form-group">
                    <label>Select Category</label>
                    <CategoryFilterInput
                        filter={{
                            active: "YES",
                            contrete: true,
                            filter: ""
                        }}
                        onChange={category => {
                            props.onChange('categoryId', category ? category.value : null)
                        }}/>
                </div>
            </div>
            <div className="col-3">
                <div className="form-group">
                    <label>Search item name</label>
                    <ItemNameSelectInput
                        key={props.filter.categoryId}
                        filter={{
                            active: "YES",
                            categoryId: props.filter.categoryId,
                            filter: ''
                        }}
                        onChange={itemName => {
                            props.onChange('itemNameId', itemName ? itemName.value : null)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}