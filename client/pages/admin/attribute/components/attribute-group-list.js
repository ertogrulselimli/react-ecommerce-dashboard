import React from 'react'
import {Link} from 'react-router-dom'
import ActionButtons from '../../../../components/form-elements/action-buttons';


export default class AttributeGroupList extends React.Component {

    render() {
        return (
            <div className="d-inline-block" style={{width: '100%'}}>
                <ActionButtons
                    onClickRefresh={this.props.onClickRefresh}
                />
                <div className="list-group">
                    {
                        this.props.data.map((groupAttr, key) => (
                            <a onClick={() => {this.props.onClickListItem(groupAttr)}} key={key} className="list-group-item text-muted c-pointer">
                                {groupAttr.name}
                                <i className="fa fa-chevron-right pull-right"/>
                            </a>
                        ))
                    }
                </div>
            </div>
        )
    }
}