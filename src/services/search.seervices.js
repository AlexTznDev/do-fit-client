import service from "./config.services";

const searchUserService = () => {
    return service.get("/search")
}

export {
    searchUserService
}