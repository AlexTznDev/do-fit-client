import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllButtons from "../../components/AllButtons";
import { Link } from "react-router-dom";

//* all services import
import { routineDetailService } from "../../services/routine.services";
import { deleteRoutineService } from "../../services/routine.services";
import Profile from "../profile/Profile";

import { BsInfoSquare } from "react-icons/bs";
import { MdAddCircle } from "react-icons/md";
import { AuthContext } from "../../context/auth.context";
import ProfilePrueba from "../profile/ProfilePrueba";

import logo from "../../logo/logo-final.png";

function RoutineDetail() {
  const { loggedUser } = useContext(AuthContext);
  console.log("LALALALALA", loggedUser);

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  console.log("LOLOLOLO", params);

  const [routineData, setRoutineData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [routineName, setroutineName] = useState(null);

  const [isUserRoad, setUserRoad] = useState(
    window.location.href.includes("user") ? true : false
  );

  const [routineOwner, setRoutineOwner] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await routineDetailService(id);

      setroutineName(response.data.name);

      console.log("AQUI LO QUE QUIERES", response.data.owner);
      setRoutineData(response.data.exercises);
      setRoutineOwner(response.data.owner);

      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRoutine = async () => {
    try {
      await deleteRoutineService(id);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div >
      

      {isFetching ? (<h2>... buscando</h2>) : routineOwner._id === loggedUser._id ? <Profile /> : <ProfilePrueba isUser={routineOwner}/>}
      
      

      {isFetching ? (
        <h2>... buscando</h2>
      ) : (
        <div className="mainContainer" style={{ paddingTop: "2rem" }}>
          <h2>{routineName}</h2>

          <br />
          <br />

          {routineData.length > 0 ? (
            routineData.map((eachExercisse) => {
              return (
                <div key={eachExercisse.exercisesId._id}>
                  {!isUserRoad ? (
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        cursor: "pointer",
                        height: "7rem",
                      }}
                      to={`/routine/${id}/exercise/${eachExercisse._id}/edit`}
                    >
                      <div className="containerInfoExercisse">
                        <div>
                          <div className="containerImgExercise">
                            <img
                              src={eachExercisse.exercisesId.image}
                              alt={eachExercisse.exercisesId.name}
                              className="imgExercise"
                            />
                          </div>
                        </div>

                        <div className="ColumnDisplay">
                          <h4>{eachExercisse.exercisesId.name}</h4>
                          <p className="grey">
                            {eachExercisse.exercisesId.category}
                          </p>
                          <p className="grey">
                            {eachExercisse.exercisesId.tagline}
                          </p>
                          <p className="grey">
                            {eachExercisse.exercisesId.calories} calories
                          </p>
                        </div>

                        <BsInfoSquare size="2rem" color="#f4a261" />
                      </div>
                      <br />
                    </Link>
                  ) : (
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        cursor: "pointer",
                        height: "7rem",
                      }}
                      to={`/routine/${id}/exercise/${eachExercisse._id}/user`}
                    >
                      <div className="containerInfoExercisse">
                        <div>
                          <div className="containerImgExercise">
                            <img
                              src={eachExercisse.exercisesId.image}
                              alt={eachExercisse.exercisesId.name}
                              className="imgExercise"
                            />
                          </div>
                        </div>

                        <div className="ColumnDisplay">
                          <h4>{eachExercisse.exercisesId.name}</h4>
                          <p className="grey">
                            {eachExercisse.exercisesId.category}
                          </p>
                          <p className="grey">
                            {eachExercisse.exercisesId.tagline}
                          </p>
                          <p className="grey">
                            {eachExercisse.exercisesId.calories} calories
                          </p>
                        </div>

                        <BsInfoSquare size="2rem" color="#f4a261" />
                      </div>
                      <br />
                    </Link>
                  )}
                </div>
              );
            })
          ) : (
            <div className="wrapperLogo">
              <div className="containerLogoFound">
                <img src={logo} alt="logo" className="imgWrapper" />
              </div>
            </div>
          )}
        </div>
      )}

      {!isUserRoad ? (
        <Link
          className={"ButtonHome"}
          style={{ marginTop: "4rem" }}
          to={`/routine/${id}/exercise/add`}
        >
          <MdAddCircle size="2rem" />
          <p className="textButton">Add exercise</p>
        </Link>
      ) : null}

      <br />
      <br />

      <div className="containerBtnStartAndDelete">
        {isFetching || routineData.length === 0 ? null : !isUserRoad ? (
          <Link
            to={`/routine/${id}/exercise/${routineData[0]._id}/start/${routineData.length}`}
          >
            <div className="ButtonStart">Start the routine!!</div>
          </Link>
        ) : (
          <Link
            to={`/routine/${id}/exercise/${routineData[0]._id}/start/${routineData.length}/user`}
          >
            <div className="ButtonStart">Start the routine!!</div>
          </Link>
        )}

        {!isUserRoad ? (
          <button onClick={handleDeleteRoutine} className="deleteRoutine">
            Delete the routine
          </button>
        ) : null}
      </div>

      <div className="ajustDiv"></div>
      <AllButtons />
    </div>
  );
}

export default RoutineDetail;
