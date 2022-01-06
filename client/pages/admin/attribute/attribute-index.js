import React from 'react'
import api from '../../../api'
import {Card, CardBody, CardTitle, Alert} from 'reactstrap';

import {FormattedMessage} from 'react-intl';
import AttributeGroupList from './components/attribute-group-list';
import AttributesByGroup from './attributes-by-group';
import CenterCircularProgress from '../../../components/ui-elements/center-circular-progress'


export default class ManagerIndex extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            groupAttributesLoading: true,
            groupAttributes: [],
            selectedGroup: null
        };


    }

    componentDidMount() {
        this.getGroupAttributes();
    }

    getGroupAttributes() {
        api.get('attributes/attribute/group/all').then(response => {
            this.setState({groupAttributes: response.data})
        });
    }

    selectGroup(selectedGroup) {
        this.setState({selectedGroup})
    }


    render() {

        return (
            <Card>
                <CardBody>
                    <CardTitle>
                        <FormattedMessage id="attributes.title" defaultMessage="Attributes"/>
                        {this.state.selectedGroup ? ' / ' + this.state.selectedGroup.name : ''}
                    </CardTitle>

                    <CenterCircularProgress portal show={this.state.saving} size={60} delay={800}/>

                    <div style={{overflow: 'hidden'}}>
                        <div style={{width: '200%'}} className={this.state.selectedGroup ? 'show-right' : 'show-left'}>

                            <div style={{width: '50%', display: 'inline-block'}}>
                                <AttributeGroupList
                                    loading={this.state.groupAttributesLoading}
                                    onClickRefresh={this.getGroupAttributes.bind(this)}
                                    onClickListItem={this.selectGroup.bind(this)}
                                    data={this.state.groupAttributes}
                                />
                            </div>

                            <div style={{width: '50%', display: 'inline-block'}}>
                                {
                                    this.state.selectedGroup
                                        ?
                                        <AttributesByGroup
                                            onClickBack={this.selectGroup.bind(this, null)}
                                            selectedGroup={this.state.selectedGroup}
                                            auth={this.props.auth}
                                        />
                                        : null
                                }


                            </div>

                        </div>
                    </div>

                </CardBody>
            </Card>
        )
    }
}
