import React from 'react'
import {displayName} from '../../../../helpers'
import classnames from 'classnames'

const ExpandIcon = props => {
    if (props.hide) return null;


    return (
        <i className={
            classnames([
                'fa mr-1',
                {
                    "text-muted": !props.isSelected,
                    "text-white": props.isSelected,
                    "fa-chevron-down": props.expanded,
                    "fa-chevron-right": !props.expanded,
                }
            ])
        }
           onClick={props.onClick}/>
    )
};


const ConcreteAvailable = ({concrete, category}) => {
    if (!concrete) return null;
    if (!category.concrete) {
        return (
            <i className="pull-right text-danger fa fa-ban"/>
        )
    } else {
        return (
            <i className="pull-right text-success fa fa-dot-circle-o"/>
        )
    }
}


class CategoryTreeItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        if (this.isSelected() && props.expandParent) {
            props.expandParent()
        }

        if (this.isSelected() && props.onFound) {
            props.onFound(this.getParams())
        }

    }

    getParams() {
        return {
            category: this.props.category,
            siblings: this.props.siblings,
            children: this.props.category.children || []

        }
    }

    toggle() {
        if (this.props.category.children && this.props.category.children.length) {
            this.setState({expanded: !this.state.expanded})
        }
    }

    expand() {
        this.setState({expanded: true});
        if (this.props.expandParent) this.props.expandParent()
    }

    onClick() {
        if (this.props.concrete && !this.props.category.concrete) return;
        if (this.props.onClick) this.props.onClick(this.getParams())
    }

    isSelected() {
        return this.props.selected && this.props.category[this.props.valueProperty] === this.props.selected
    }

    render() {
        const category = this.props.category;
        const children = this.props.category.children || [];

        return (
            <div className="c-pointer" style={{display: this.props.hide ? 'none' : 'block'}}>
                <p className={"px-2 py-1 m-0" + (this.isSelected() ? " bg-info" : "")}>
                    <ExpandIcon
                        isSelected={this.isSelected()}
                        hide={!children.length}
                        onClick={this.toggle.bind(this)}
                        expanded={this.state.expanded}
                    />
                    <span onClick={this.onClick.bind(this)}>{displayName(category.displayName)}</span>
                    <ConcreteAvailable
                        concrete={this.props.concrete}
                        category={this.props.category}
                    />
                </p>

                <div className="pl-3">
                    {
                        children.map((childCategory, key) => (
                            <CategoryTreeItem
                                hide={!this.state.expanded}
                                key={key}
                                category={childCategory}
                                expandParent={this.expand.bind(this)}
                                onClick={this.props.onClick}
                                selected={this.props.selected}
                                onFound={this.props.onFound}
                                siblings={children}
                                valueProperty={this.props.valueProperty}
                                concrete={this.props.concrete}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}


export default (props) => {
    const {categories, ...rest} = props;
    return (
        categories.map((category, key) => (
            <CategoryTreeItem key={key} category={category} {...rest}/>
        ))
    )
}