import React from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';


const ErrorIcon = ({fields, errors}) => {
    if (!fields) return null;
    let error = false;
    fields.forEach(field => {
        if (errors[field]) error = true
    });
    return error ? <i className="fa fa-exclamation-circle text-danger"/> : null
};


export default props => {

    return (
        <Nav tabs>
            {
                props.links.map(link => (
                    <NavItem key={link.tab}>
                        <NavLink
                            className={classnames({active: props.active === link.tab})}
                            onClick={e => props.onClick(link.tab)}
                        >
                            {link.title} <ErrorIcon fields={link.fields} errors={props.errors}/>
                        </NavLink>
                    </NavItem>
                ))
            }
        </Nav>
    )
}