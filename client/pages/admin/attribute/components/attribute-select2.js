/**
 * Created by Administrator on 3/30/2019.
 */
import React from "react";
import AttributesTable from "./attribute-table";
import withSelect2 from "../../common/with-select2-hoc";

const extraInfo={
    additionalFilters: [{id: 'group', value: 'PRODUCT'}],
    filterUrl: `attributes/attribute/filtered/`
}

export  default  withSelect2(AttributesTable,extraInfo);


