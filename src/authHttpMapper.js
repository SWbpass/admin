import axios from 'axios';
import cookie from 'react-cookies'

//export const API_BASE_URL = "https://b-pass.herokuapp.com";
export const API_BASE_URL = "http://218.38.215.158:8080/";

export const logout = async () => cookie.remove('accessToken');

export const getHttp = async (url, config) => {
    return await checkToken()
        .then(async () => {
            return await axios.get(API_BASE_URL + url, config)
            //.catch(error => { console.log('error : ', error.response.data) });
        });

};

export const postHttp = async (url, body, config) => {
    return await checkToken()
        .then(async () => {
            return await axios.post(API_BASE_URL + url, body, config)
            //.catch(error => { console.log('error : ', error.response.data) });
        })
};

export const putHttp = async (url, body, config) => {
    return await checkToken()
        .then(async () => {
            return await axios.put(API_BASE_URL + url, body, config)
            //.catch(error => { console.log('error : ', error.response.data) });
        })
};

export const deleteHttp = async (url, config) => {
    return await checkToken()
        .then(async () => {
            return await axios.delete(API_BASE_URL + url, config)
            //.catch(error => { console.log('error : ', error.response.data) });
        });
};

export const setTokens = async (accessToken, refreshToken) => {
    setAccessToken(accessToken);
};

const checkToken = async () => {
    let accessToken = await cookie.load('accessToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

const setAccessToken = (accessToken) => {
    cookie.save('accessToken', accessToken,
        {
            path: '/',
            //secure: true
            //httpOnly: true
        });
};

export const checkLoginStatus = async () => {
    let accessToken = await cookie.load('accessToken');
    return accessToken !== undefined;
};