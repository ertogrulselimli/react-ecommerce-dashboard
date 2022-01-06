import React from "react";
import CategorySelectInput from '../../../../catalog/components/category-select-input';
import {FormattedMessage} from "react-intl";


export default ({categories, formik}) => {

    return(
        <CategorySelectInput
            label={
                <FormattedMessage id="product.barcode.form.category.label"
                                  defaultMessage="Category"/>
            }
            categories={categories}
            value={formik.values.categoryId}
            valueProperty="id"
            name={formik.values.categoryDescription}
            onChange={selected => {
                formik.setFieldValue('categoryId', selected.category.id);
                formik.setFieldValue('categoryDescription', selected.category.description);
            }}
        />

    )
}