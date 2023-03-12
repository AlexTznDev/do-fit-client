import service from "./config.services";

const profileSerivce = () => {
    return service.get("/profile")

}

const profileEditService = (userId, editProfile) => {
    return service.patch(`/profile/${userId}`, editProfile)
}

// const exerciseDeleteService = (exerciseId) => {
//     return service.delete(`/exercise/${exerciseId}`)
// }

export {
   profileSerivce,
   profileEditService
}