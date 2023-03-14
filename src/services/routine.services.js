import service from "./config.services";

const routineService = () => {
  return service.get("/routine");
};

const routineDetailService = (id) => {
  return service.get(`/routine/${id}`);
};

const crearRoutineService = (newRoutine) => {
  return service.post("/routine", newRoutine);
};

const routineUserService = (id) => {
  return service.get(`/userInformation/${id}`);
};

const ExerciseInRoutineDetail = (idRoutine, idExerciseInArray) => {
  return service.get(`/routine/${idRoutine}/${idExerciseInArray}`);
};

const RemoveExerciseFromRoutine = (idRoutine, idExerciseInArray) => {
  return service.patch(`routine/${idRoutine}/${idExerciseInArray}`);
};

const EditExerciseFromRoutine = (idRoutine, idExerciseInArray, updateExercise)=>{
    return service.patch(`routine/${idRoutine}/${idExerciseInArray}/edit`, updateExercise)
}

const deleteRoutineService = (id) =>{
    return service.delete(`/routine/${id}`)
}

const AddExerciseToRoutineService = (idRoutine, addExercisseToRoutine)=>{
    return service.patch(`/routine/${idRoutine}`, addExercisseToRoutine)
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
  routineService,
  crearRoutineService,
  routineDetailService,
  routineUserService,
  ExerciseInRoutineDetail,
  RemoveExerciseFromRoutine,
  EditExerciseFromRoutine,
  deleteRoutineService,
  AddExerciseToRoutineService
};
