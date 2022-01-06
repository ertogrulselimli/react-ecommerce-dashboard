/**
 * Created by Administrator on 4/23/2019.
 */
import React from 'react'


export function onClickRow(row) {
        this.setState(state => {
            if (!state.selectedEntity) {
                state.selectedEntity = row.original;
                state.selectedIndex = row.index;
            }
            else if (state.selectedEntity.id === row.original.id) {
                state.selectedEntity = null;
                state.selectedIndex = null;
            } else {
                state.selectedEntity = row.original;
                state.selectedIndex = row.index;
            }
            return state;
        });
}

export function refresh() {
        this.mxReactTableRef.current.updateExternally();
}


export function addNewItem() {
    this.setState({selectedEntity: null,
        selectedIndex:null,
        showForm: true,
        form: {}});
}
