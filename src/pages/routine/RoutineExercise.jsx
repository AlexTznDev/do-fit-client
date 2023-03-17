import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Exercise from "../exercisse/Exercise";
import Bipsound from "../../sounfFile/bip.wav";

import AllButtons from "../../components/AllButtons";
import ReactPlayer from "react-player";

import { MdFastfood } from "react-icons/md";
import { BiRun } from "react-icons/bi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { TfiTimer } from "react-icons/tfi";
import { BsArrowRepeat } from "react-icons/bs";


//* all services import
import { routineDetailService } from "../../services/routine.services";
import { ExerciseInRoutineDetail } from "../../services/routine.services";
import { RemoveExerciseFromRoutine } from "../../services/routine.services";
import { EditExerciseFromRoutine } from "../../services/routine.services";
import ButtonBack from "../../components/ButtonBack";
import SearchingSpinner from "../../components/SearchingSpinner";

function RoutineExercise() {
  const params = useParams();
  const { idRoutine, idExerciseInArray, lengthData } = params;

  const bipAudio = new Audio(Bipsound);

  const navigate = useNavigate();

  const [isUserRoad, setIsUserRoad] = useState(
    window.location.href.includes("user") ? true : false
  );

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
  const [isEndRoutine, setisEndRoutine] = useState(false);

  const [isAddExerciseRoad, setisAddExerciseRoad] = useState(
    window.location.href.includes("add") ? true : false
  );




  useEffect(() => {
    getDataExerciseInArrayRoutine();
  }, [countExerciseInroutine]);

  const getDataExerciseInArrayRoutine = async () => {
    try {
      if (isStartExerciseRoad && !isAddExerciseRoad) {
        const response = await routineDetailService(idRoutine);

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
        const response = await ExerciseInRoutineDetail(
          idRoutine,
          idExerciseInArray
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
      await RemoveExerciseFromRoutine(idRoutine, idExerciseInArray);

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
      await EditExerciseFromRoutine(
        idRoutine,
        idExerciseInArray,
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
    if (
      parseInt(lengthData) === countExerciseInroutine + 1 &&
      countSeriesDone + 1 === series
    ) {
      setisEndRoutine(true);
      setIsRoutineFinished(false);
    }
  };

  const handleNextExercise = () => {
    setcountExerciseInroutine((currentState) => {
      return currentState + 1;
    });

    setIsRoutineFinished(false);
  };

  const handleEndRoutine = () => {
    if (!isUserRoad) {
      navigate(`/routine/${idRoutine}`);
    } else {
      navigate(`/routine/${idRoutine}/user`);
    }
  };

  return (

    <div className="mainContainer">
      {/* <div style={{position: "absolute", left:"0"}}>
      <ButtonBack/>
      </div> */}
      <div className="ContainerDetailExercise"  style={{backgroundColor: isAddExerciseRoad ? '#fff' : 'rgb(39, 39, 39)'}}>
      


        {!isEditRoad ? (
          <Exercise />
        ) : isFetching ? (
          <SearchingSpinner/>
        ) : (
          <div className="mainContainer">
            <ReactPlayer
              config={{
                youtube: {
                  playerVars: { modestbranding: 1 },
                },
              }}
              url={exercisseData.exercisesId.videoUrl}
              width="100vw"
            />
            <div className="ContainerdetailExerciseText">
              <h2>{exercisseData.exercisesId.name}</h2>
              <p className="grey" style={{ lineHeight: "27px" }}>
                {exercisseData.exercisesId.description}
              </p>
              <div className="wrapperTextIconDetailExercise">
                <div
                  style={{
                    minWidth: "1.5rem",
                  }}
                >
                  <MdFastfood size="1rem" />
                </div>
                <p>Burn {exercisseData.exercisesId.calories} calories</p>
              </div>

              <div className="wrapperTextIconDetailExercise">
                <div
                  style={{
                    minWidth: "1.5rem",
                  }}
                >
                  <BiRun size="1.3rem" />
                </div>
                <p>{exercisseData.exercisesId.tagline}</p>
              </div>

              
            </div>

            <br />
            <br />

            {isStartExerciseRoad ? (
              <div className="containerSeriesChronometerAndButton">
                <div className="chronometro">
                  <h2>{chronometro}</h2>
                </div>
                <div className="containerBtnChronometer">
                  <button onClick={handleStartChronometer}>Start</button>
                  <button onClick={handleResetChronometer}>reset</button>
                </div>
                <div
                  style={{
                    height: ".2px",
                    backgroundColor: "#ffffff60",
                    width: "90%",
                  }}
                ></div>

                <div className="SeriesCounter">
                  <h2>
                    {countSeriesDone}/ {series}
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
                {isEndRoutine ? (
                  <button className="endExercise" onClick={handleEndRoutine}>
                    End routine
                  </button>
                ) : null}
              </div>
            ) : !isUserRoad ? (
              <div className="ContainerForm">
                <form>
                  <label style={{color:"#fff"}} htmlFor="repeticion">repeticion</label>
                  <input
                    type="number"
                    name="repeticion"
                    value={repeticion}
                    onChange={handleRepeticionChange}
                  />

                  <label style={{color:"#fff"}} htmlFor="series">series</label>
                  <input
                    type="number"
                    name="series"
                    value={series}
                    onChange={handleSeriesChange}
                  />

                  <label style={{color:"#fff"}} htmlFor="chronometro">chronometro</label>
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

                  <button className="ButtonCreate" onClick={handleRemove}>
                    Remove from the routine
                  </button>
                </form>
              </div>
            ) : 
           (
               <div className="containerFoundUser">
                 <div>
                 <BsArrowRepeat size="1.3rem" style={{marginRight: "1rem"}}/>
                 <p>Series: {exercisseData.series}</p>
                 </div>

                 <div>
                 <GiWeightLiftingUp size="1.3rem" style={{marginRight: "1rem"}}/>
                 <p>Repetitions: {exercisseData.repeticion}</p>
                 </div>

                 <div>
                 <TfiTimer size="1.3rem" style={{marginRight: "1rem"}}/>
                 <p>TimeOut: {exercisseData.chronometro}</p>
                 </div>

               </div>
           )
            }
            <div className="ajustDiv"></div>
            <AllButtons />
          </div>
        )}
      </div>
    </div>
  );
}

export default RoutineExercise;
