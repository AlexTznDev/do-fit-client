import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { exerciseDetailService } from "../../services/exercise.services";
import { exerciseDeleteService } from "../../services/exercise.services";

import ReactPlayer from "react-player";

import AllButtons from "../../components/AllButtons";

//* import of services
import { AddExerciseToRoutineService } from "../../services/routine.services";

import { MdFastfood } from "react-icons/md";

import { AuthContext } from "../../context/auth.context";
import { MdDescription } from "react-icons/md";
import { BiRun } from "react-icons/bi";

function Exercisedetails() {

  const { loggedUser } = useContext(AuthContext)

  const params = useParams();
  const { id } = params;
  const { idRoutine, idExercise } = params;

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
        const response = await exerciseDetailService(idExercise);

        setDetailsExercise(response.data);
        setisFetching(false);
      } else {
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
      await AddExerciseToRoutineService(idRoutine, addExercisseToRoutine);

      navigate(`/routine/${idRoutine}`);
    } catch (error) {}
  };

  return (
    <div className="mainContainer">
      <div className="ContainerDetailExercise">
        {isFetching ? null : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // width: "30rem",
            }}
          >
           <ReactPlayer
              config={{
                youtube: {
                  playerVars: { modestbranding: 1 },
                },
              }}
              url={detailsExercise.videoUrl}
              width="100%"
            />

            <div className="ContainerdetailExerciseText">
              <h2>{detailsExercise.name}</h2>

              <div className="wrapperTextIconDetailExercise">
                <div
                  style={{
                    minWidth: "1.5rem",
                  }}
                >
                  <MdFastfood size="1rem" />
                </div>
                <p>Burn {detailsExercise.calories} calories</p>
              </div>

              <div className="wrapperTextIconDetailExercise">
                <div
                  style={{
                    minWidth: "1.5rem",
                  }}
                >
                  <BiRun size="1.3rem" />
                </div>
                <p>{detailsExercise.tagline}</p>
              </div>
              <p className="grey" style={{lineHeight:"27px"}}>{detailsExercise.description}</p>
              <br />
              <br />
            </div>

            {!isRoutineRoad ? (
              // AQUI RESTRINGIR ESTOS DOS BOTONES
              loggedUser.role === "admin" ?
              <div className="containerEditAndDelete">
                <button onClick={handleDeleteExercise}>Delete</button>
                <Link to={`/exercise/${detailsExercise._id}/edit`}>Edit</Link>
              </div> : null
            ) : (
              <div className="ContainerForm">
                <form>
                  <label htmlFor="repeticion"></label>
                  <input
                    type="number"
                    name="repeticion"
                    onChange={handleRepeticionChange}
                    placeholder="repeticion"
                  />

                  <label htmlFor="series"></label>
                  <input
                    type="number"
                    name="series"
                    onChange={handleSeriesChange}
                    placeholder="series"
                  />

                  <label htmlFor="chronometro"></label>
                  <input
                    type="number"
                    name="chronometro"
                    onChange={handleChronometerChange}
                    placeholder="chronometro"
                  />
                  <br />
                  <br />
                  <button className="ButtonCreate" onClick={handleSubmit}>
                    Add to my routine
                  </button>
                </form>
              </div>
            )}
            <div className="ajustDiv"></div>
          </div>
        )}
      </div>

      <AllButtons />
    </div>
  );
}

export default Exercisedetails;
