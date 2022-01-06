import {
    SHOW_REQUEST_ERROR,
    CLOSE_REQUEST_ERROR
} from '../constants'


const initalState = {
    requestError: null
};

export default (state = initalState, action) => {
    switch (action.type) {
        case SHOW_REQUEST_ERROR:
            return {...state, requestError: action.payload};

        case CLOSE_REQUEST_ERROR:
            return {...state, requestError: null};
        default:
            return state

    }
}