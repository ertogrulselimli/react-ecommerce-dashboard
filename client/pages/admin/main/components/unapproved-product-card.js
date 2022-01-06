import React from 'react'
import CircularProgress from '../../../../components/ui-elements/center-circular-progress'
import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from "redux";
import * as productApproveAction from "../../../../redux/actions/product-approve-actions";
import {connect} from "react-redux";


const UnapprovedProductCard = ({unapprovedProductCount}) => (

    <div className="text-white bg-info card" style={{position: 'relative', height: '150px'}}>
        <div className="card-body">
            <p className="text-value">{unapprovedProductCount.count}</p>
            <FormattedMessage
                id="dashboard.index.card.unaproved_product_count.message"
                defaultMessage="product waiting for approve"
            />

            <CircularProgress
                show={unapprovedProductCount.loading}
                size={20}
                borderSize={3}
                color='white'
            />
        </div>
    </div>
)


function mapStoreToProps(state) {
    return {
        unapprovedProductCount: state.unapprovedProductCount
    }
}


function mapDispatchToProps(dispatch) {
    return {
        productApproveAction: bindActionCreators(productApproveAction, dispatch),
    }
}


export default connect(mapStoreToProps, mapDispatchToProps)(UnapprovedProductCard);