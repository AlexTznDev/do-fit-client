import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { exerciseDetailService } from "../../services/exercise.services";
import { exerciseDeleteService } from "../../services/exercise.services";
import axios from "axios";

import AllButtons from "../../components/AllButtons";

function Exercisedetails() {
  const params = useParams();
  const { id } = params;
  const { idRoutine, idExercise } = params;
  console.log(params);

  const navigate = useNavigate();

  const [detailsExercise, setDetailsExercise] = useState(null);
  const [isFetching, setisFetching] = useState(true);
  const [isRoutineRoad, setisRoutineRoad] = useState(idRoutine ? true : false);
  const [repeticion, setrepeticion] = useState(0);
  const [series, setSeries] = useState(0);
  const [chronometro, setChronometro] = useState(0);

  useEffect(() => {
    getDetailDataExercise();
  }, []);

  const getDetailDataExercise = async () => {
    try {

      if (isRoutineRoad) {
        console.log("if routuine road ");
        const response = await exerciseDetailService(idExercise);

        console.log(response.data)
        setDetailsExercise(response.data);
        setisFetching(false);
      } else {
        console.log("if routuine not road ");
        const response = await exerciseDetailService(id);
        setDetailsExercise(response.data);
        setisFetching(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteExercise = async () => {
    try {
      await exerciseDeleteService(id);
      navigate("/exercise");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRepeticionChange = (e) => {
    setrepeticion(e.target.value);
  };
  const handleSeriesChange = (e) => {
    setSeries(e.target.value);
  };
  const handleChronometerChange = (e) => {
    setChronometro(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addExercisseToRoutine = {
      exercisesId: idExercise,
      series,
      repeticion,
      chronometro,
    };

    try {
      await axios.patch(
        `http://localhost:5005/api/routine/${idRoutine}`,
        addExercisseToRoutine
      );
      navigate(`/routine/${idRoutine}`);
    } catch (error) {}
  };

  return (
    <div className="mainContainer">
      <AllButtons />

      {isFetching ? null : (
        <div>
          <h2>{detailsExercise.name}</h2>
          <p>{detailsExercise.calories}</p>
          <p>{detailsExercise.category}</p>
          <p>{detailsExercise.description}</p>
          <p>{detailsExercise.videoUrl}</p>
          <p>{detailsExercise.image}</p>

          {!isRoutineRoad ? (
            <div>
              <button onClick={handleDeleteExercise}>Delete</button>
              <Link to={`/exercise/${detailsExercise._id}/edit`}>Edit</Link>
            </div>
          ) : (
            <div>
              <form>
                <label htmlFor="repeticion">repeticion</label>
                <input
                  type="number"
                  name="repeticion"
                  onChange={handleRepeticionChange}
                />

                <label htmlFor="series">series</label>
                <input
                  type="series"
                  name="series"
                  onChange={handleSeriesChange}
                />

                <label htmlFor="chronometro">chronometro</label>
                <input
                  type="chronometro"
                  name="chronometro"
                  onChange={handleChronometerChange}
                />

                <button onClick={handleSubmit}>Add to my routine</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Exercisedetails;
