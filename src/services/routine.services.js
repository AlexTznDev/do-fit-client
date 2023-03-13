import service from "./config.services";

const routineService = () => {
    return service.get("/routine")

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

    routineService
   
}