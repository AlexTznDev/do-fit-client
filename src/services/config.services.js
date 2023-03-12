import axios from "axios"

const service = axios.create({
    baseURL: "http://localhost:5005/api"
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