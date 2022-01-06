import React from 'react'
import ReactDOM from 'react-dom'

import ActionButtons from '../../../../../components/form-elements/action-buttons';
import ProductBarcodesTable from './product-barcodes-table';
import ProductBarcodesForm from './product-barcodes-form';
import SweetAlert from 'react-bootstrap-sweetalert'
import {injectIntl} from 'react-intl'


const body = document.getElementById('root');

class ProductBarcodesIndex extends React.Component {


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
            form: this.props.formik.values.barcodes[this.state.selected]
        })
    }

    add() {
        this.setState({selected: null, showForm: true, form: {}})
    }

    remove() {
        let selected = this.state.selected;
        let barcodes = [...this.props.formik.values.barcodes];
        barcodes[selected].prevCrud = barcodes[selected].crud;
        barcodes[selected].crud = 'd';
        this.props.onChange(barcodes);
        this.setState({selected: null})
    }

    undo(){
        let selected = this.state.selected;
        let barcodes = [...this.props.formik.values.barcodes];
        barcodes[selected].crud = barcodes[selected].prevCrud;
        delete barcodes[selected].prevCrud;
        this.props.onChange(barcodes);
        this.setState({selected: null})
    }

    dissmissAlert() {
        this.setState({alertMsg: null, sweetAlertMsg: null})
    }

    submit(data) {

        let barcodes = [...this.props.formik.values.barcodes];
        let selected = this.state.selected;
        if (selected !== null) {
            barcodes[selected] = data;
            if (barcodes[selected].id === null) {
                barcodes[selected].crud = 'i'
            } else {
                barcodes[selected].crud = 'u'
            }
        }else{
            data.crud = 'i';
            barcodes.push(data)
        }

        this.setState({showForm: false, selected: null});

        this.props.onChange(barcodes);

    }

    render() {

        const barcodes = this.props.formik.values.barcodes;
        const {selected} = this.state;
        return (
            <div>

                <ActionButtons
                    disableEdit={selected === null}
                    hideDelete={selected === null || barcodes[selected].crud === 'd'}
                    hideUndo={selected === null || barcodes[selected].crud !== 'd'}
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


                <ProductBarcodesTable
                    show={true}
                    loading={false}
                    list={this.props.formik.values.barcodes}
                    onClickRow={this.onClickRow.bind(this)}
                    selectedIndex={this.state.selected}
                    attributeTypes={this.state.attributeTypes}
                />

                {
                    this.state.showForm ?
                        <ProductBarcodesForm
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


export default injectIntl(ProductBarcodesIndex)