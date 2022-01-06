import store from '../redux'


export function displayName(data){
    if(!data.length) return '';
    const lang = store.getState().auth.language
    let returnData = data.find(obj => obj.language === lang);
    if(returnData){
        return returnData.translation
    }

    return data[0] ? data[0].translation : ''
}




/**
 * Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
 */
export function omit(obj, omitKeys) {
    const result = {};
    Object.keys(obj).forEach((key) => {
        if (omitKeys.indexOf(key) === -1) {
            result[key] = obj[key];
        }
    });
    return result;
}
