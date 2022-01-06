import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    USER_AUTHORIZED,
    AUTH_USER_DATA_FAILED,
    LANGUAGE_CHANGED,
    SYSTEM_LANGUAGES_LOADED
} from "../constants";


let defaultState = {
    loading: false,
    loggedIn: null,
    language: 'az',
    langs: [],
    isShopManager(){
        return this.authority === 'ROLE_SHOP'
    },
    isShopOwner(){
        return this.authority === 'ROLE_SUPERADMIN'
    }
};


export default (state = defaultState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return Object.assign({}, state, Object.assign({}, action.payload, {
                loading: false,
                loggedIn: true,
            }));

        case USER_LOGGED_OUT:
            return {...defaultState,
                language: state.language,
                loading: false,
                loggedIn: false,
                langs: state.langs
            };


        case AUTH_USER_DATA_FAILED:
            return Object.assign({}, state, {
                loading: false,
                loggedIn: false
            });

        case USER_AUTHORIZED:

            let data = Object.assign({}, action.payload, {
                authorized: true,
                loading: false,
                loggedIn: true
            });

            return Object.assign({}, state, data);

        case LANGUAGE_CHANGED:
            return Object.assign({}, state, {language: action.payload.language});

        case SYSTEM_LANGUAGES_LOADED:
            return Object.assign({}, state, {langs: action.payload });

        default:
            return state

    }
}