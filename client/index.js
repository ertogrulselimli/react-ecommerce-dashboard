import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {changeLanguage} from './redux/actions/auth-actions'
import store from './redux/index'
import App from './app'


require('./components/coreui/style/style.css');
require('./assets/scss/style.scss');


// get user's language from localStorage.
// If user not select language before we will get browser language for this
const userSelectedLang = localStorage.getItem('language');

let appLanguage;

if (!userSelectedLang || !['az, ru'].includes(userSelectedLang)) {

    // Define user's language. Different browsers have the user locale defined
    // on different fields on the `navigator` object, so we make sure to account
    // for these different by checking all of them
    const language = (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage;

    // Split locales with a region code
    const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

    // Try full locale, fallback to locale without region code, fallback to az
    appLanguage = ['az','ru'].includes(languageWithoutRegionCode) ? languageWithoutRegionCode: 'az'
}

store.dispatch(changeLanguage(appLanguage));



ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)



