import React from 'react'


export default class AssingRole extends React.Component {


    render() {

        console.log(this.props.values)

        return (
            <div className="row">
                <div className="col-6">
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-secondary">Assinged</li>
                    </ul>
                    {
                        this.props.values.map((value, key) => (
                            <li className="list-group-item d-flex" key={key}>
                                <div style={{flex: 5}}>
                                    {value.code}
                                    <p className="font-sm">
                                        {value.description}
                                    </p>
                                </div>
                                <div className="align-self-center"  style={{flex: 1}}>
                                    <button className="btn btn-outline-danger btn-circle pull-right btn-sm">
                                        <i className="fa fa-times"/>
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </div>
                <div className="col-6">
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-secondary">Available</li>
                        {
                            this.props.data.map((value, key) => (
                                <li className="list-group-item d-flex" key={key}>
                                    <div style={{flex: 5}}>
                                        {value.code}
                                        <p className="font-sm">
                                            {value.description}
                                        </p>
                                    </div>
                                    <div className="align-self-center"  style={{flex: 1}}>
                                        <button className="btn btn-outline-success btn-circle pull-right btn-sm">
                                            <i className="fa fa-link"/>
                                        </button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>
        )
    }

}