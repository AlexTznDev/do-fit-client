import service from "./config.services";

const profileSerivce = () => {
    return service.get("/profile")

}

// const exerciseCreateService = (newExercise) => {
//     return service.post("/exercise", newExercise)
// }

// const exerciseDetailService = (exerciseId) => {
//     return service.get(`/exercise/${exerciseId}`)
// }

// const exerciseEditService = (exerciseId, editExercise) => {
//     return service.patch(`/exercise/${exerciseId}`, editExercise)
// }

// const exerciseDeleteService = (exerciseId) => {
//     return service.delete(`/exercise/${exerciseId}`)
// }

export {
   profileSerivce
}