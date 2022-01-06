import {
    PRODUCT_UNAPPROVED_COUNT_LOADED,
    PRODUCT_UNAPPROVED_COUNT_LOADING,
} from "../constants";
import api from "../../api";
import connection from '../../components/websocket/connection'


export function getProductUnpprovedCount() {

    return dispatch => {
        dispatch({type: PRODUCT_UNAPPROVED_COUNT_LOADING});
        api.get('product/unapprove-count').then(response => {
            dispatch({type: PRODUCT_UNAPPROVED_COUNT_LOADED, payload: response.data.body})
        });

    }
}

export function listenProductCountChange() {
    return dispatch => {
        connection.client.subscribe('/topic/productunapprovedcount', msg => {
            dispatch({type: PRODUCT_UNAPPROVED_COUNT_LOADED, payload: msg.body})
        })
    }
}

