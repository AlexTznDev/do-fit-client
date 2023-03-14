import service from "./config.services";

const profileSerivce = () => {
    return service.get("/profile")

}

const profileEditService = (userId, editProfile) => {
    return service.patch(`/profile/${userId}`, editProfile)
}

const profileUserService = (idFoundUser) => {
    return service.get(`/profile/${idFoundUser}`)
}

const followFoundUserService = (idFoundUser) => {
    return service.patch(`/userInformation/${idFoundUser}/followUser`)
}


export {
   profileSerivce,
   profileEditService,
   profileUserService,
   followFoundUserService
}