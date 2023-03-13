import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Exercise from "../exercisse/Exercise";

import axios from "axios";
import AllButtons from "../../components/AllButtons";

function RoutineExercise() {
  const params = useParams();
  const { idRoutine, idExerciseInArray } = params;

  console.log(params);
  console.log(idRoutine, idExerciseInArray);
  const [isEditRoad, setisEditRoad] = useState(idExerciseInArray ? true : false);
  const [exercisseData, setexercisseData] = useState(null);
  const [isFetching, setisFetching] = useState(true);

  useEffect(() => {
    getDataExerciseInArrayRoutine();
  }, []);

  const getDataExerciseInArrayRoutine = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/routine/${idRoutine}/${idExerciseInArray}`
      );
      console.log(response.data.exercises[0]);
      setexercisseData(response.data.exercises[0]);
      setisFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer">
      <AllButtons />
      {!isEditRoad ? (
        <Exercise />
      ) : isFetching ? (
        <h2>...Buscando</h2>
      ) : (
        <div>
          <h2>name: {exercisseData.exercisesId.name}</h2>
          <p>category: {exercisseData.exercisesId.category}</p>
          <p>description: {exercisseData.exercisesId.description}</p>
          <p>calories: {exercisseData.exercisesId.calories}</p>
          <p>chronometro: {exercisseData.chronometro}</p>
          <p>repeticion: {exercisseData.repeticion}</p>
          <p>series: {exercisseData.series}</p>
        </div>
      )}
    </div>
  );
}

export default RoutineExercise;
