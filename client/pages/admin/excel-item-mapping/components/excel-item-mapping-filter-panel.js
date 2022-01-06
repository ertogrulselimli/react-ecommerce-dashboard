import React, {useState} from 'react'
import ShopFilterInput from "../../shop/components/shop-filter-input";
import ImportFileNameSelectInput from "../../import/components/import-filename-select-input";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

export default props => {

    const [showColumnsFilter, toggleColumnsFilter] = useState(false)
    if (props.hide) return null;

    const shopId = props.filter.shop ? props.filter.shop.value : null;

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
                <div className="form-group">
                    <label>Shop</label>
                    <ShopFilterInput
                        onChange={shop => {
                            props.onChange('shop', shop)
                        }}/>

                </div>
            </div>

            <div className="col-3">
                <div className="form-group">
                    <label>Select File</label>
                    <ImportFileNameSelectInput
                        filter={{
                            shopId: shopId
                        }}
                        key={shopId}
                        value={props.filter.value}
                        onChange={file => {
                            props.onChange('file', file);
                        }}/>
                </div>
            </div>


        </div>
    )
}