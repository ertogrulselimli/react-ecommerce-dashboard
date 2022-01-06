import React from 'react'
import CategoryPositionChange from "../category-position-change";
import {FormattedMessage} from "react-intl";
import {displayName} from "../../../../../helpers";


export default ({formik, topSalesCategories}) => {
    if (!formik.values.showInCategoryTopSales) return null;

    return (
        <div className="mt-3">
            <CategoryPositionChange
                label={
                    <FormattedMessage
                        id="categories.form.top_sales_rank.label"
                        defaultMessage="Top sales rank"
                    />
                }
                categories={topSalesCategories}
                orderProperty={"topSalesRank"}
                category={formik.values}
                title={displayName(formik.values.parentName)}
                onPositionChange={result => {
                    formik.setFieldValue("topSalesRank", result);
                }}
            />
        </div>
    )
}