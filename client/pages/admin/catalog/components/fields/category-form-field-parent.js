import React from 'react'
import {displayName} from "../../../../../helpers";
import CategorySelectInput from "../category-select-input";


export default ({formik, setSiblings, categories}) => {

    if(formik.values.root) return null;

    return (

        <CategorySelectInput
            label="Parent"
            valueProperty="id"
            categories={categories}
            value={formik.values.parentId}
            name={displayName(formik.values.parentName)}
            onChange={selected => {
                formik.setFieldValue("parentId", selected.category.id );
                formik.setFieldValue("parentName", selected.category.displayName);
                setSiblings(selected.children.filter(child => child.code !== props.values.code));

            }}
        />
    )

}