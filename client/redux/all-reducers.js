import { combineReducers } from 'redux'
import auth from './reducers/auth'
import tabs from './reducers/tabs'
import operations from './reducers/operations'
import alert from './reducers/alert'
import unapprovedProductCount from './reducers/unapproved-product-count'


export default combineReducers({
    auth,
    operations,
    tabs,
    alert,
    unapprovedProductCount
});
