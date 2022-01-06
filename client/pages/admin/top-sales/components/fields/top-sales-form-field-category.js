import React from "react";
import CategorySelectInput from '../../../catalog/components/category-select-input';
import {FormattedMessage} from "react-intl";


export default ({categories, formik}) => {

    return (
        <CategorySelectInput
            label={
                <FormattedMessage id="comission_by_category.form.category.label"
                                  defaultMessage="Category"/>
            }
            categories={categories}
            value={formik.values.categoryId}
            valueProperty="id"
            name={formik.values.categoryDescription}
            onChange={selected => {
                formik.setFieldValue('categoryId', selected ? selected.category.id : null);
                formik.setFieldValue('categoryDescription', selected.category.description);
            }}
        />

    )
}