import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    AUTH_USER_DATA_LOADING,
    AUTH_USER_DATA_FAILED,
    SYSTEM_LANGUAGES_LOADED,
    OPERATION_STARTED,
    LANGUAGE_CHANGED,
} from "../constants";

import api from "../../api";
import history from "../../components/route/history";


const parseUserData = (userData) => {
    let base64Url = userData.token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let tokenData = JSON.parse(window.atob(base64));
    console.log(tokenData)
    return Object.assign({}, userData, {
        username: tokenData.sub,
        authority: tokenData.auth
    });
};


export function logout() {
    return dispatch => {
        localStorage.removeItem('auth');
        dispatch({type: USER_LOGGED_OUT});
        history.push('/sign-in');
    }
}


export function login(credentials) {

    return dispatch => {

        return api.post('authenticate', credentials).then(response => {
                try{
                    localStorage.setItem('auth', JSON.stringify(response.data));
                    dispatch({type: USER_LOGGED_IN, payload: parseUserData(response.data)});
                    return response;
                }catch (error){
                    console.log(error)
                }

            }
        )
    }
}

export function changeLanguage(language) {
    localStorage.setItem('language', language);
    return {type: LANGUAGE_CHANGED, payload: {language: language}};
}


export function getUserData() {
    return async (dispatch) => {
        dispatch({type: AUTH_USER_DATA_LOADING});
        await null;
        const auth = localStorage.getItem('auth');
        if (!auth) {
            dispatch({type: AUTH_USER_DATA_FAILED});
        } else {
            dispatch({type: USER_LOGGED_IN, payload: parseUserData(JSON.parse(auth))});
        }


    }
}

export function getLanguages(){
    return async (dispatch) => {
        try{
            let response = await api.get('platform/languages');
            dispatch({type: SYSTEM_LANGUAGES_LOADED, payload: response.data})
        }catch (error){
        }

    }
}






