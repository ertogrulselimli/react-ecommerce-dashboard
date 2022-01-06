import React from 'react'
import ReactDOM from 'react-dom'

import ActionButtons from '../../../../../components/form-elements/action-buttons';
import ProductArticulesTable from './product-articules-table';
import ProductArticulesForm from './product-articules-form';
import SweetAlert from 'react-bootstrap-sweetalert'
import {injectIntl} from 'react-intl'


const body = document.getElementById('root');

class ProductArticulesIndex extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            selected: null,
            showForm: false,
            form: {}
        };


    }

    componentDidMount() {

    }

    onClickRow(row) {
        this.setState(state => {
            state.selected = row.index === state.selected ? null : row.index;
            return state
        })
    }


    hideForm() {
        this.setState({showForm: false})
    }

    edit() {
        this.setState({
            showForm: true,
            form: this.props.formik.values.articules[this.state.selected]
        })
    }

    add() {
        this.setState({selected: null, showForm: true, form: {}})
    }

    remove() {
        let selected = this.state.selected;
        let articules = [...this.props.formik.values.articules];
        articules[selected].prevCrud = articules[selected].crud;
        articules[selected].crud = 'd';
        this.props.onChange(articules);
        this.setState({selected: null})
    }

    undo(){
        let selected = this.state.selected;
        let articules = [...this.props.formik.values.articules];
        articules[selected].crud = articules[selected].prevCrud;
        delete articules[selected].prevCrud;
        this.props.onChange(articules);
        this.setState({selected: null})

    }

    dissmissAlert() {
        this.setState({alertMsg: null, sweetAlertMsg: null})
    }

    submit(data) {

        let articules = [...this.props.formik.values.articules];
        let selected = this.state.selected;
        if (selected !== null) {
            articules[selected] = data;
            if (articules[selected].id === null) {
                articules[selected].crud = 'i'
            } else {
                articules[selected].crud = 'u'
            }
        }else{
            data.crud = 'i';
            articules.push(data)
        }

        this.setState({showForm: false, selected: null});

        this.props.onChange(articules);

    }

    render() {

        const articules = this.props.formik.values.articules;
        const {selected} = this.state;
        return (
            <div>

                <ActionButtons
                    disableEdit={selected === null}
                    hideDelete={selected === null || articules[selected].crud === 'd'}
                    hideUndo={selected === null || articules[selected].crud !== 'd'}
                    onClickEdit={this.edit.bind(this)}
                    onClickAdd={this.add.bind(this)}
                    onClickDelete={this.remove.bind(this)}
                    onClickUndo={this.undo.bind(this)}
                />


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


                <ProductArticulesTable
                    show={true}
                    loading={false}
                    list={this.props.formik.values.articules}
                    onClickRow={this.onClickRow.bind(this)}
                    selectedIndex={this.state.selected}
                    attributeTypes={this.state.attributeTypes}
                />

                {
                    this.state.showForm ?
                        <ProductArticulesForm
                            productId={this.props.productId}
                            formData={this.state.form}
                            onSubmit={this.submit.bind(this)}
                            categories={this.props.categories}
                            toggle={this.hideForm.bind(this)}
                        /> :
                        null
                }
            </div>
        )
    }
}


export default injectIntl(ProductArticulesIndex)