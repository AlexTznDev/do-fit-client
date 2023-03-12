import service from "./config.services";

const exerciseSerivce = () => {
    return service.get("/exercise")

}

const exerciseCreateService = (newExercise) => {
    return service.post("/exercise", newExercise)
}

const exerciseDetailService = (exerciseId) => {
    return service.get(`/exercise/${exerciseId}`)
}

const exerciseEditService = (exerciseId, editExercise) => {
    return service.patch(`/exercise/${exerciseId}`, editExercise)
}

const exerciseDeleteService = (exerciseId) => {
    return service.delete(`/exercise/${exerciseId}`)
}

export {
    exerciseSerivce,
    exerciseCreateService,
    exerciseDetailService,
    exerciseEditService,
    exerciseDeleteService
}