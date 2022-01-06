import React from 'react'
import ReactDOM from 'react-dom'
import api from '../../../../api'
import {Alert} from 'reactstrap';

import ActionButtons from '../../../../components/form-elements/action-buttons';
import AttributesTable from './product-attributes-table';
import AttributeForm from './product-attributes-form';
import SweetAlert from 'react-bootstrap-sweetalert'
import {injectIntl, defineMessages} from 'react-intl'

const messages = defineMessages({
    attributeUpdateSuccessMsg: {
        id: 'attribute.update_success_msg',
        defaultMessage: 'Attribute updated successfully'
    },
    attributeCreatedSuccessMsg: {
        id: 'attribute.create_success_msg',
        defaultMessage: 'Attribute created successfully'
    },
    selecteCategoryFirstMsg: {
        id: 'product.attributes.select_category_first_msg',
        defaultMessage: 'To display this information please select category'
    }
});

const body = document.getElementById('root');

class ProductAttributes extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            loadingAttributes: true,
            attributes: [],
            attributeTypes: [],
            attributeValues: [],
            selected: null,
            showForm: false,
            form: {}
        };


    }

    componentDidMount() {
        if (this.props.productId) {
            this.getAttributes();
        }


    }

    getAttributes() {
        this.setState({loadingAttributes: true});
        api.get('catalog/product/attributes/' + this.props.productId).then(response => {
            this.setState({attributes: response.data, loadingAttributes: false})
            this.props.onChange(response.data);
        });
    }

    getAttributesByCategory(categoryId) {
        api.post('catalog/product/attributes/category', {
            categoryId,
            productId: this.props.productId
        }).then(response => {
            this.setState({attributes: response.data, loadingAttributes: false});
            this.props.onChange(response.data);

        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categoryId !== this.props.categoryId) {
            this.getAttributesByCategory(nextProps.categoryId)
        }
    }

    onClickRow(row) {

        this.setState(state => {
            state.selected = row.index === state.selected ? null : row.index;
            return state
        })
    }

    edit() {

        let attribute = this.state.attributes[this.state.selected];
        api.get(`attributes/attribute/${attribute.productTypeAttr.attribute.id}/values`).then(response => {
            this.setState({
                showForm: true,
                form: attribute,
                attributeValues: response.data
            })
        })
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



    submit(data) {

        this.setState(state => {
            if (state.selected !== null) {
                state.attributes[state.selected] = data;
                if (state.attributes[state.selected].id === null) {
                    state.attributes[state.selected].crud = 'i'
                } else {
                    state.attributes[state.selected].crud = 'u'
                }
            }

            state.showForm = false;
            state.selected = null;


            this.props.onChange(state.attributes);
            return state
        });

    }

    render() {

        const {attributes, selected} = this.state;
        return (
            <div>

                <ActionButtons
                    hide={!this.props.categoryId}
                    disableEdit={selected === null}
                    onClickEdit={this.edit.bind(this)}
                />


                <Alert type="success" isOpen={!this.props.categoryId} toggle={this.dissmissAlert.bind(this)}>
                    { this.props.intl.formatMessage(messages.selecteCategoryFirstMsg) }
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
                    show={this.props.productId || this.props.categoryId}
                    loading={this.state.loadingAttributes}
                    list={this.state.attributes}
                    onClickRow={this.onClickRow.bind(this)}
                    selectedIndex={this.state.selected}
                    attributeTypes={this.state.attributeTypes}
                />

                {
                    this.state.showForm ?
                        <AttributeForm
                            attributes={this.state.attributes}
                            productId={this.props.productId}
                            formData={this.state.form}
                            onSubmit={this.submit.bind(this)}
                            attributeValues={this.state.attributeValues}
                            toggle={this.back.bind(this)}
                        /> :
                        null
                }
            </div>
        )
    }
}


export default injectIntl(ProductAttributes)