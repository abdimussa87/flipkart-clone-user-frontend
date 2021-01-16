import axios from 'axios';
// import store from './app/store'
const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        Authorization: token !== null ? 'Bearer ' + token : ''
    }
})

instance.interceptors.request.use((req) => {
    // const { auth } = store.getState();
    const newToken = localStorage.getItem('token')
    if (newToken) {
        req.headers.Authorization = `Bearer ${newToken}`
    }
    return req
})

export default instance;