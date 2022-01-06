/**
 * Created by Administrator on 4/2/2019.
 */

import React from "react";
import ItemNameTable from "./item-name-table";
import withSelect2 from "../../common/with-select2-hoc";

const extraInfo={
    filterUrl: `catalog/item-name/filtered/`
}

export  default  withSelect2(ItemNameTable,extraInfo);