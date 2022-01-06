import React, {useState} from 'react'
import ShopFilterInput from "../../shop/components/shop-filter-input";


export default props => {

    if (props.hide) return null;

    return (
        <div className='row'>

            <div className="col-3">
                <div className="form-group">
                    <label>Shop</label>
                    <ShopFilterInput
                        onChange={shop => {
                            props.onChange('shopId', shop ? shop.value : null)
                        }}/>
                </div>
            </div>

            <div className="col-3">
                <div className="form-group">
                    <label>Processed</label>
                    <select
                        value={props.filter.processed}
                        onChange={e => {
                            props.onChange('processed', e.target.value)
                        }}
                        className="form-control">
                        <option/>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
            </div>


        </div>
    )
}