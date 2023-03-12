import service from "./config.services";

const signupSerivce = (newUser) => {
    return service.post("/auth/signup", newUser)

}

const loginService = (userCredentials) => {
    return service.post("/auth/login", userCredentials)
}

const verifyService = () => {
    return service.get("/auth/verify")
}

export {
    signupSerivce,
    loginService,
    verifyService
}