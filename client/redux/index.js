import allReducers from './all-reducers.js'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [
    thunk
];

export default createStore(allReducers, composeWithDevTools(
    applyMiddleware(...middleware)
));
