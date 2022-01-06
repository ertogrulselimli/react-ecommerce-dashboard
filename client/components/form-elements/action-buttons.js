import React from 'react'
import {injectIntl, defineMessages} from 'react-intl';
import SweetAlert from 'react-bootstrap-sweetalert'
import {createPortal} from 'react-dom'

const root = document.getElementById('root')

const messages = defineMessages({
    saveButtonTitle: {
        id: 'action_buttons.save.title',
        defaultMessage: 'save'
    },
    addButtonTitle: {
        id: 'action_buttons.add.title',
        defaultMessage: 'add'
    },
    editButtonTitle: {
        id: 'action_buttons.edit.title',
        defaultMessage: 'edit'
    },
    deleteButtonTitle: {
        id: 'action_buttons.delete.title',
        defaultMessage: 'delete'
    },
    defualtConfirmMessage: {
        id: 'action_buttons.default.confirm_message',
        defaultMessage: 'Are you sure'
    },
    backButtonTitle: {
        id: 'action_buttons.back.title',
        defaultMessage: 'go back'
    },
    refreshButtonTitle: {
        id: 'action_buttons.refresh.title',
        defaultMessage: 'refresh'
    },
    undoButtonTitle: {
        id: 'action_buttons.undo.title',
        defaultMessage: 'Undo'
    }
});


const Button = props => {
    if (!props['onClick' + props.button.name]) return null;
    if (props['hide' + props.button.name]) return null;
    return (
        <button
            type="button"
            className={"btn btn-circle pull-right mx-1 " + 'btn-' + props.button.type}
            onClick={props.onClick}
            disabled={props['disable' + props.button.name]}
            title={props.button.title}
        >
            <i className={props.button.icon}/>
        </button>
    )
};


class ActionButtons extends React.Component {

    constructor(props) {
        super(props);

        this.buttons = [
            {
                name: 'Save',
                type: 'success',
                title: props.intl.formatMessage(messages.saveButtonTitle),
                icon: 'fa fa-save'
            },
            {
                name: 'Delete',
                type: 'danger',
                title: props.intl.formatMessage(messages.deleteButtonTitle),
                icon: 'fa fa-times',
            },
            {
                name: 'Refresh',
                type: 'primary',
                title: props.intl.formatMessage(messages.refreshButtonTitle),
                icon: 'fa fa-refresh'
            },
            {
                name: 'Undo',
                type: 'primary',
                title: props.intl.formatMessage(messages.undoButtonTitle),
                icon: 'fa fa-undo'
            },
            {
                name: 'Edit',
                type: 'default',
                title: props.intl.formatMessage(messages.editButtonTitle),
                icon: 'fa fa-edit'
            },
            {
                name: 'Add',
                type: 'default',
                title: props.intl.formatMessage(messages.addButtonTitle),
                icon: 'fa fa-plus'
            }
        ]
            .concat(props.addButtons || [])
            //back button should be at the begining
            .concat([
                {
                    name: 'Back',
                    type: 'primary',
                    title: props.intl.formatMessage(messages.backButtonTitle),
                    icon: 'fa fa-chevron-left'
                }]
            );

        this.state = {
            showConfirm: false,
            confirmButtonName: null,
            confirmMessage: ''
        }
    }

    hideConfirm() {
        this.setState({showConfirm: false, confirmButtonName: null})
    }

    onClick(button) {
        if (this.props['confirm' + button.name]) {
            this.setState({
                confirmButtonName: button.name,
                showConfirm: true,
                confirmMessage: this.props[`confirm${button.name}Message`] || this.props.intl.formatMessage(messages.defualtConfirmMessage)
            })
        } else {
            this.props['onClick' + button.name]()
        }
    }

    render() {

        if (this.props.hide) return null;
        return (
            <div className="row">
                <div className="col-lg-12 py-1 ">
                    {
                        this.buttons.map((button, key) => (

                          <Button key={key} button={button} {...this.props}
                                           onClick={this.onClick.bind(this, button)}/>
                        ) )
                    }
                </div>


                {
                    createPortal(
                        <SweetAlert
                            show={this.state.showConfirm}
                            warning
                            confirmBtnText="Ok"
                            showCancel={true}
                            confirmBtnBsStyle="warning"
                            cancelBtnText="Cancel"
                            btnSize="xs"
                            title={this.state.confirmMessage}
                            onConfirm={() => {
                                this.props['onClick' + this.state.confirmButtonName]();
                                this.hideConfirm()
                            }}
                            onCancel={this.hideConfirm.bind(this)}
                        >
                            {this.state.sweetAlertMsg}
                        </SweetAlert>,
                        root
                    )
                }

            </div>
        )
    }
}

export default injectIntl(ActionButtons);
