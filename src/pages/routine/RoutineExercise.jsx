import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Exercise from "../exercisse/Exercise";
import Bipsound from "../../sounfFile/bip.wav";

import axios from "axios";
import AllButtons from "../../components/AllButtons";

function RoutineExercise() {
  const params = useParams();
  const { idRoutine, idExerciseInArray } = params;

  const bipAudio = new Audio(Bipsound);

  const navigate = useNavigate();

  const [isEditRoad, setisEditRoad] = useState(
    idExerciseInArray ? true : false
  );
  const [exercisseData, setexercisseData] = useState(null);
  const [isFetching, setisFetching] = useState(true);
  const [repeticion, setrepeticion] = useState(0);
  const [series, setSeries] = useState(0);
  const [chronometro, setChronometro] = useState(0);
  const [isStartExerciseRoad, setisStartExerciseRoad] = useState(
    window.location.href.includes("start") ? true : false
  );
  const [isChronometerRunning, setisChronometerRunning] = useState(false);

  const [countExerciseInroutine, setcountExerciseInroutine] = useState(0);
  const [countSeriesDone, setcountSeriesDone] = useState(0);
  const [IsRoutineFinished, setIsRoutineFinished] = useState(false);

  const [isAddExerciseRoad, setisAddExerciseRoad] = useState(
    window.location.href.includes("add") ? true : false
  );

  useEffect(() => {
    getDataExerciseInArrayRoutine();
  }, [countExerciseInroutine]);

  const getDataExerciseInArrayRoutine = async () => {
    try {
      if (isStartExerciseRoad && !isAddExerciseRoad) {
        const response = await axios.get(
          `http://localhost:5005/api/routine/${idRoutine}`
        );
        setrepeticion(
          response.data.exercises[countExerciseInroutine].repeticion
        );
        setSeries(response.data.exercises[countExerciseInroutine].series);
        setChronometro(
          response.data.exercises[countExerciseInroutine].chronometro
        );
        setexercisseData(response.data.exercises[countExerciseInroutine]);
        setisFetching(false);
      } else if (!isStartExerciseRoad && !isAddExerciseRoad) {
        const response = await axios.get(
          `http://localhost:5005/api/routine/${idRoutine}/${idExerciseInArray}`
        );

        setrepeticion(response.data.exercises[0].repeticion);
        setSeries(response.data.exercises[0].series);
        setChronometro(response.data.exercises[0].chronometro);
        setexercisseData(response.data.exercises[0]);
        setisFetching(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5005/api/routine/${idRoutine}/${idExerciseInArray}`
      );
      navigate(`/routine/${idRoutine}`);
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
    const updateExercise = {
      newRepeticion: repeticion,
      newSeries: series,
      newChronometro: chronometro,
    };

    try {
      await axios.patch(
        `http://localhost:5005/api/routine/${idRoutine}/${idExerciseInArray}/edit`,
        updateExercise
      );
      navigate(`/routine/${idRoutine}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartChronometer = () => {
    setisChronometerRunning(true);
  };
  const handleResetChronometer = () => {
    setChronometro(exercisseData.chronometro);
    setisChronometerRunning(false);
  };

  useEffect(() => {
    if (isChronometerRunning && chronometro > 0) {
      const intervalId = setInterval(() => {
        setChronometro((currentState) => {
          if (currentState === 4) {
            bipAudio.play();
          } else if (currentState === 1) {
            setisChronometerRunning(false);
          }
          return currentState - 1;
        });
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isChronometerRunning]);

  const handleSerieIncrement = () => {
    if (countSeriesDone + 1 <= series && !IsRoutineFinished) {
      setcountSeriesDone(countSeriesDone + 1);
    }
    if (countSeriesDone + 1 === series) {
      setIsRoutineFinished(true);
      setcountSeriesDone(0);
    }
  };

  const handleNextExercise = () => {
    setcountExerciseInroutine((currentState) => {
      return currentState + 1;
    });
    setIsRoutineFinished(false);
    console.log(exercisseData)
  };

  return (
    <div className="mainContainer">
      {!isEditRoad ? (
        <Exercise />
      ) : isFetching ? (
        <h2>...Buscando</h2>
      ) : (
        <div className="mainContainer">
          <AllButtons />
          <h2>name: {exercisseData.exercisesId.name}</h2>
          <p>category: {exercisseData.exercisesId.category}</p>
          <p>description: {exercisseData.exercisesId.description}</p>
          <p>calories: {exercisseData.exercisesId.calories}</p>

          {isStartExerciseRoad ? (
            <div>
              <div className="chronometro">
                <h2>chronometro: {chronometro}</h2>
                <button onClick={handleStartChronometer}>Start</button>
                <button onClick={handleResetChronometer}>reset</button>
              </div>

              <div className="SeriesCounter">
                <h2>
                  series count: {countSeriesDone}/ {series}
                </h2>
                <button onClick={handleSerieIncrement}>1 serie DONE</button>
              </div>
              <br />
              <br />
              {IsRoutineFinished ? (
                <button className="nextExercise" onClick={handleNextExercise}>
                  Next exercise
                </button>
              ) : null}

              <h2>
                You have to do {exercisseData.series} series of
                {exercisseData.repeticion} repeticion
              </h2>
            </div>
          ) : (
            <div>
              <form>
                <label htmlFor="repeticion">repeticion</label>
                <input
                  type="number"
                  name="repeticion"
                  value={repeticion}
                  onChange={handleRepeticionChange}
                />

                <label htmlFor="series">series</label>
                <input
                  type="number"
                  name="series"
                  value={series}
                  onChange={handleSeriesChange}
                />

                <label htmlFor="chronometro">chronometro</label>
                <input
                  type="number"
                  name="chronometro"
                  value={chronometro}
                  onChange={handleChronometerChange}
                />
                <br />
                <br />
                <button onClick={handleSubmit} className="ButtonCreate">
                  Edit exercise to my routine
                </button>
                <br />
                <br />
              </form>

              <button className="ButtonCreate" onClick={handleRemove}>
                Remove from the routine
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RoutineExercise;
