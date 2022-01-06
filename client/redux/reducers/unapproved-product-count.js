import {
    PRODUCT_UNAPPROVED_COUNT_LOADED,
    PRODUCT_UNAPPROVED_COUNT_LOADING,
} from '../constants'


const initalState = {
    loading: false,
    count: 0
};

export default (state = initalState, action) => {
    switch (action.type) {
        case PRODUCT_UNAPPROVED_COUNT_LOADED:
            return {...state, count: action.payload, loading: false};
        case PRODUCT_UNAPPROVED_COUNT_LOADING:
            return {...state, loading: true};
        default:
            return state

    }
}