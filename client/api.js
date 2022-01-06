import axios from 'axios'
import store from './redux'
import {
    USER_LOGGED_OUT
} from "./redux/constants";


const config = {
    api: process.env.API_URL
};


let handleError = error => {
    if (error.response && error.response.status === 401) {
        store.dispatch({type: USER_LOGGED_OUT})
    }
    throw error
};

const setHeader = () => {
    let auth = store.getState().auth;
    let header = {}
    if (auth.token) {
        header.Authorization = 'Bearer ' + auth.token
    }
    return header
}


export default {

    get: (url, params) => {
        return axios.get(config.api + url, {
            params,
            headers: setHeader()
        }).catch(handleError)
    },

    post: (url, params, configParams = {}) => {
        configParams.headers = Object.assign({}, setHeader(), configParams.headers || {});
        configParams.url = config.api + url;
        configParams.method = 'post';
        configParams.data = params;
        return axios(configParams).catch(handleError)
    },

    put: (url, params) => {
        return axios.put(config.api + url, params, {
            headers: setHeader()
        }).catch(handleError)
    },


    delete: (url, params) => {
        return axios.delete(config.api + url, {
            params,
            headers: setHeader()
        }).catch(handleError)
    },


    postFile: (url, params, config = {}) => {
        return axios.post(config.api + url, params, {
                headers: {
                    ...setHeader(),
                    'content-type': 'multipart/form-data'
                },
                ...config
            }
        ).catch(handleError)
    },

    download(url, params){
        let auth = store.getState().auth;

        return axios.get(config.api + url, {
            params,
            headers: {
                Authorization: 'bearer ' + auth.access_token,
            },
            responseType: 'blob'
        }).then(response => {
            const disposition = response.headers['content-disposition'];
            let fileName = 'category.xlsx';
            if (disposition && disposition.indexOf('attachment') !== -1) {
                let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                let matches = filenameRegex.exec(disposition);
                if (matches !== null && matches[1]) {
                    fileName = matches[1].replace(/['"]/g, '');
                }

            }
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            return response
        }).catch(handleError)
    }
}
