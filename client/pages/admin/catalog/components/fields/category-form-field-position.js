import React from 'react'
import {FormattedMessage} from "react-intl";
import {displayName} from "../../../../../helpers";
import CategoryPositionChange from "../category-position-change";


export default ({formik, siblings}) => {

    return (

        <CategoryPositionChange
            label={
                <FormattedMessage
                    id="category.form.position.label"
                    defaultMessage="Position"
                />
            }
            categories={siblings}
            category={formik.values}
            orderProperty={"rank"}
            title={displayName(formik.values.parentName)}
            onPositionChange={rank => {
                formik.setFieldValue("rank", rank);
            }}
        />
    )

}