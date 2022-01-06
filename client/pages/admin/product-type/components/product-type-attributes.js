import React from 'react'
import ReactDOM from 'react-dom'
import api from '../../../../api'
import {Alert} from 'reactstrap';

import ActionButtons from '../../../../components/form-elements/action-buttons';
import AttributesTable from './product-type-attributes-table';
import AttributeForm from './product-type-attributes-form';
import SweetAlert from 'react-bootstrap-sweetalert'
import {injectIntl, defineMessages} from 'react-intl'
import MXReactTable from "../../common/mx-react-table";
import productTypeAttributesColumns from '../components/product-type-attributes-columns';

const messages = defineMessages({
    attributeUpdateSuccessMsg: {
        id: 'attribute.update_success_msg',
        defaultMessage: 'Attribute updated successfully'
    },
    attributeCreatedSuccessMsg: {
        id: 'attribute.create_success_msg',
        defaultMessage: 'Attribute created successfully'
    },
    saveMainDataFirstMsg: {
        id: 'product_type.save_main_data_first_msg',
        defaultMessage: 'To display this information please save the main data first'
    }
});

const body = document.getElementById('root');

class ProductTypeAttributes extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            selected: null,
            showForm: false,
            form: {}
        };


    }


    onClickRow(row) {
        if(!row.original.active) return;
        this.setState(state => {
            state.selected = row.index === state.selected ? null : row.index;
            return state
        })
    }

    edit() {
        this.setState({showForm: true, form: this.props.attributes[this.state.selected]})
    }

    add() {
        this.setState({selected: null, showForm: true, form: {}})
    }

    back() {
        this.setState({showForm: false})
    }

    save() {
        this.formSubmit()
    }

    refresh() {
        this.getAttributes(this.props.selectedGroup.code);
    }

    dissmissAlert() {
        this.setState({alertMsg: null, sweetAlertMsg: null})
    }

    remove() {
        let attributes = [...this.props.attributes];

        attributes[this.state.selected].crud = 'd';
        this.props.onChange(attributes);

        this.setState({selected: null})
    }

    undoRemove() {
        let attributes = [...this.props.attributes];

        attributes[this.state.selected].crud = attributes[this.state.selected].initalCreate ? 'i' : null;
        this.props.onChange(attributes);

        this.setState({selected: null})

    }

    submit(data) {

        let attributes = [...this.props.attributes];
        let selected = this.state.selected;
        if (selected !== null) {
            attributes[selected] = data;
            if (attributes[selected].initalCreate) {
                attributes[selected].crud = 'i'
            } else {
                attributes[selected].crud = 'u'
            }
        } else {
            data.initalCreate = true;
            data.crud = 'i';
            attributes.push(data)
        }

        this.setState({showForm: false, selected: null});
        this.props.onChange(attributes);


    }

    render() {

        const {selected} = this.state;
        const {attributes} = this.props;

        return (
            <div>

                <ActionButtons
                    hideAdd={this.props.auth.isShopManager()}
                    disableDelete={selected === null}
                    hideDelete={this.props.auth.isShopManager() || (selected !== null && attributes[selected].crud === 'd')}
                    hideUndo={selected === null || attributes[selected].crud !== 'd'}
                    disableEdit={selected === null}
                    onClickAdd={this.add.bind(this)}
                    onClickEdit={this.edit.bind(this)}
                    onClickUndo={this.undoRemove.bind(this)}
                    onClickDelete={this.remove.bind(this)}
                />


                <Alert type="success" isOpen={!!this.state.alertMsg} toggle={this.dissmissAlert.bind(this)}>
                    { this.state.alertMsg }
                </Alert>

                {
                    ReactDOM.createPortal(
                        <SweetAlert
                            show={!!this.state.sweetAlertMsg}
                            error
                            confirmBtnText="Ok"
                            confirmBtnBsStyle="danger"
                            btnSize="xs"
                            title=""
                            onConfirm={this.dissmissAlert.bind(this)}
                            onCancel={this.dissmissAlert.bind(this)}
                        >
                            {this.state.sweetAlertMsg}
                        </SweetAlert>,
                        body
                    )
                }


                <AttributesTable
                    show={true}
                    loading={false}
                    list={this.props.attributes}
                    onClickRow={this.onClickRow.bind(this)}
                    selectedIndex={this.state.selected}
                />

    {/*            <MXReactTable
                    //data={this.props.attributes}
                    columns={productTypeAttributesColumns}
                    onClickRow={this.onClickRow.bind(this)}
                    selectedIndex={this.state.selected}
                />*/}

                {
                    this.state.showForm ?
                        <AttributeForm
                            attributes={this.props.attributes}
                            productTypeId={this.props.productTypeId}
                            formData={this.state.form}
                            onSubmit={this.submit.bind(this)}
                            toggle={this.back.bind(this)}
                        /> :
                        null
                }
            </div>
        )
    }
}


export default ProductTypeAttributes