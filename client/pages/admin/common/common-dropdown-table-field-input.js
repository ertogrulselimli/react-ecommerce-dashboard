/**
 * Created by Administrator on 4/10/2019.
 */
import React from 'react'
import {injectIntl} from 'react-intl'
import {Dropdown, DropdownToggle, DropdownMenu,DropdownItem} from 'reactstrap';
import SelectFromTgTable from './select-from-table'
import PropTypes from 'prop-types';

class CommonDropDownTableFieldInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
        };
        this.dropdown=React.createRef();
        this.toggle = this.toggle.bind(this);
        this.onSelectEntity = this.onSelectEntity.bind(this);
    }


    toggle(e) {
        const portal=document.getElementById('portal-target');
        console.log('loggin portal current')
        console.log(portal);
        console.log('logging e target');
        console.log(e.target);
       // if (this.state.dropdownOpen && (e.target === this.dropdown.current || !this.dropdown.current.contains(e.target))) return;
        if(this.state.dropdownOpen && (e.target=== portal.current || portal.contains(e.target))) return;
            this.setState(prevState => ({
                dropdownOpen: !prevState.dropdownOpen
            }));
    }


    onSelectEntity(entity) {
        this.props.formik.setFieldValue(this.props.fieldId, entity.id);
        this.props.formik.setFieldValue(this.props.fieldDescription, entity.description);
        //this.toggle(this.dropdown.current)
        this.setState({
            dropdownOpen:false
        })
    }


    render() {

        const formik = this.props.formik;
        if(this.props.showInput===false){
            return null;
        }
        return (
            <div ref={this.dropdown}>
                <Dropdown
                    nav={false}
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                    size="lg"
                    className="dropdownpositionstatic"


                >
                    <DropdownToggle
                        tag={'div'}
                        color="default"
                    >
                        <div className={this.props.divClassName||"form-group"}>
                            <label className={this.props.labelClassName||"control-label"}>
                                {
                                    this.props.intl.formatMessage({
                                        id:this.props.intlMessageId,
                                        defaultMessage:this.props.intlDefaultMessage
                                    })
                                }
                            </label>
                        <div className="input-group">
                            <input
                                className={this.props.fieldClassName||"form-control"}
                                disabled={true}
                                value={formik.values[this.props.fieldDescription]}
                            />
                            <div className="input-group-prepend c-pointer">
                                <span className="input-group-text">
                                    <i className="fa fa-edit"/></span>
                            </div>
                        </div>
                        </div>
                    </DropdownToggle>

                    <DropdownMenu

                        //tag={'body'}
                    >
                        <SelectFromTgTable
                            onSelectEntity={this.onSelectEntity}
                            filterUrl={this.props.filterUrl}
                            columns={this.props.columns}
                            filtered={this.props.filters}
                            additionalFilters={this.props.additionalFilters}
                        />
                    </DropdownMenu>
                </Dropdown>
            </div>

        )
    }
}

CommonDropDownTableFieldInput.propTypes={
    fieldClassName:PropTypes.string, //  css class of disabled input element
    labelClassName:PropTypes.string, // css class of label
    divClassName:PropTypes.string, // css class of div that contain label and disabled input
    fieldId:PropTypes.string,        //name of formik element that will be send to server via submit
    fieldDescription:PropTypes.string,  //name of formik element that will be shown
    intlMessageId:PropTypes.string,    // internalizaion label id
    intlDefaultMessage:PropTypes.string, //internalization default message
    showInput:PropTypes.bool,            //boolean value if true this input will be visible in form else invisible
    filterUrl:PropTypes.string, // filterUrl of service that all content will come from for filling react table inside drop down
    columns:PropTypes.array,  // COlumns of react table that will be shown in drop down element
    additionalFilters:PropTypes.array //additional filters for service filterUrl,
    //formik:PropTypes.  which formik this input elemnet belogs to

}


export default injectIntl(CommonDropDownTableFieldInput);
