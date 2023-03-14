import axios from "axios"

const service = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

service.interceptors.request.use((config) => {
    
    const localStorageToken = localStorage.getItem("authToken")
    const realToken = `Bearer ${localStorageToken}`

    if (localStorageToken) {
        config.headers.authorization = realToken
    }
    return config

})

export default service;   