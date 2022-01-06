import {
    CLOSE_REQUEST_ERROR,
    SHOW_REQUEST_ERROR
} from '../constants'



export function showRequestError(error){
    if(error.response){
        return {type: SHOW_REQUEST_ERROR, payload: error.response.data}
    }

    return {type: 'n'}
}


export function closeRequestAlert(){
    return {type: CLOSE_REQUEST_ERROR}

}