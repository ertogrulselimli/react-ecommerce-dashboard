import {
    OPERATION_FILE_UPLOADED
} from "../constants";


let defaultState = {
    uploadedFileNames: [],
};


export default (state = defaultState, action) => {
    switch (action.type) {
        case OPERATION_FILE_UPLOADED:
            return {...state, uploadedFileNames: [action.payload.fileName, ...state.uploadedFileNames]};

        default:
            return state

    }
}