import React from 'react'
import api from '../../../../api'
import FilterInput from '../../../../components/form-elements/filter-input'
import CenterCircularProgress from '../../../../components/ui-elements/center-circular-progress'
import {displayName} from '../../../../helpers'


export default class ProductTypeSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            loading: false,
            initalSearch: true
        }
    }

    inputChange(value) {
        this.setState({loading: true, list: []});
        api.post('producttypes/filtered/0/50', value, {
            headers: {
                'Content-Type': 'text/plain'
            }
        }).then(response => {
            this.setState({list: response.data, loading: false, initalSearch: false})
        }).catch(error => {
            this.setState({error: true})
        });
    }

    render() {

        if (this.props.hide) return null;
        return (
            <div>
                <FilterInput onChange={this.inputChange.bind(this)} timeout={300}/>
                <ul className="list-group">

                    {
                        this.state.list.map((attr, key) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center c-pointer"
                                key={key}
                                onClick={() => this.props.onSelect(attr)}>
                                <span>{attr.description}</span>
                            </li>
                        ))
                    }
                </ul>
                <div className="position-relative" style={{width: '100%'}}>
                    <CenterCircularProgress
                        show={!this.state.initalSearch && this.state.loading && !this.state.list.length}
                        size="32"
                        borderSize="4"
                    />
                </div>

            </div>
        )

    }


}