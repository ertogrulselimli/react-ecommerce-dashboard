import React from 'react'
import {Alert} from 'reactstrap';

import ActionButtons from '../../../components/form-elements/action-buttons';
import AttributeValuesTable from './components/attribute-values-table';
import AttributeValuesForm from './components/attribute-values-form';
import {injectIntl} from 'react-intl'

class AttributesValues extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: null,
            showForm: false,
            form: {},
        };
    }

    componentDidMount() {
    }

    onClickRow(row) {
        if(!row.original.active) return;
        this.setState(state => {
            state.selected = row.index === state.selected ? null : row.index;
            return state
        })
    }

    edit() {
        this.setState({showForm: true, form: {...this.props.values[this.state.selected]}})
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

    remove() {
        let values = [...this.props.values];
        values[this.state.selected].previousCrud = values[this.state.selected].crud;
        values[this.state.selected].crud = 'd';
        this.props.onChange(values);
        this.setState({selected: null})
    }

    undo() {
        let values = [...this.props.values];
        values[this.state.selected].crud = values[this.state.selected].previousCrud;

        this.props.onChange(values);
        this.setState({selected: null});
    }

    dismissAlert() {
        this.setState({alertMsg: null, sweetAlertMsg: null})
    }

    submit(data) {
        let values = [...this.props.values];
        data.crud = data.id ? 'u': 'i';
        if (this.state.selected !== null) {
            values[this.state.selected] = data
        } else {
            values.push(data)
        }
        this.setState({selected: null, showForm: false});
        this.props.onChange(values);

    }



    filterDeletedMesurements(){
        let unitSet = new Set(this.props.uniteOfMeasurements.filter(unit => unit.crud !== 'd').map(u => u.id));
        return this.props.values.filter(v => !v.unitOfMeasurement || unitSet.has( v.unitOfMeasurement.id))
    }

    render() {

        return (
            <div>
                <ActionButtons
                    hideAdd={this.props.auth.isShopManager()}
                    hideSave={this.props.auth.isShopManager()}
                    disableEdit={this.state.selected === null}
                    hideDelete={this.props.auth.isShopManager() || this.state.selected === null || this.props.values[this.state.selected].crud === 'd'}
                    hideUndo={this.state.selected === null || this.props.values[this.state.selected].crud !== 'd'}
                    disableRefresh={this.state.showForm}
                    onClickAdd={this.add.bind(this)}
                    onClickEdit={this.edit.bind(this)}
                    onClickDelete={this.remove.bind(this)}
                    onClickUndo={this.undo.bind(this)}
                />

                <Alert type="success" isOpen={!!this.state.alertMsg} toggle={this.dismissAlert.bind(this)}>
                    {this.state.alertMsg}
                </Alert>

                <AttributeValuesTable
                    show={true}
                    loading={false}
                    list={this.filterDeletedMesurements()}
                    onClickRow={this.onClickRow.bind(this)}
                    selectedIndex={this.state.selected}
                    attributeTypes={this.state.attributeTypes}
                />

                {
                    this.state.showForm ?
                        <AttributeValuesForm
                            formData={this.state.form}
                            onSubmit={this.submit.bind(this)}
                            uniteOfMeasurements={this.props.uniteOfMeasurements}
                            onClose={this.back.bind(this)}
                            attributeValues={this.filterDeletedMesurements()}
                        />
                        :
                        null
                }


            </div>
        )
    }
}


export default injectIntl(AttributesValues)