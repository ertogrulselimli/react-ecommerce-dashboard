import React from 'react'
import UnapprovedProductCard from './components/unapproved-product-card'

const DashboardIndex = props => {

    return (
        <div className="row">
            <div className="col-12 col-sm-6 col-lg-3">
                <UnapprovedProductCard/>
            </div>
        </div>
    )
};


export default DashboardIndex