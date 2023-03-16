import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllButtons from "../../components/AllButtons";
import { Link } from "react-router-dom";

//* all services import
import { routineDetailService } from "../../services/routine.services";
import { deleteRoutineService } from "../../services/routine.services";
import Profile from "../profile/Profile";
import { AuthContext } from "../../context/auth.context";


function RoutineDetail() {

  const { loggedUser } = useContext(AuthContext)
  console.log("LALALALALA", loggedUser)

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  console.log("LOLOLOLO", params)

  const [routineData, setRoutineData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const [isUserRoad, setUserRoad] = useState(
    window.location.href.includes("user") ? true : false
  );

  const [ routineOwner, setRoutineOwner ] = useState(null)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await routineDetailService(id);
      console.log("AQUI LO QUE QUIERES", response.data.owner)
      setRoutineData(response.data.exercises);
      setRoutineOwner(response.data.owner)

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

      {isFetching ? (<h2>... buscando</h2>) : routineOwner._id === loggedUser._id ? <Profile /> : <p>FUNCIONA</p>}
      
      

      {isFetching ? (
        <h2>... buscando</h2>
      ) : (
        routineData.map((eachExercisse) => {
          return (
            <div key={eachExercisse.exercisesId._id}>
              {!isUserRoad ? (
                <Link to={`/routine/${id}/exercise/${eachExercisse._id}/edit`}>
                  <h4>{eachExercisse.exercisesId.name}</h4>
                </Link>
              ) : (
                <Link to={`/routine/${id}/exercise/${eachExercisse._id}/user`}>
                  <h4>{eachExercisse.exercisesId.name}</h4>
                </Link>
              )}
            </div>
          );
        })
      )}

      {!isUserRoad ? (
        <Link to={`/routine/${id}/exercise/add`}>
          <div className="ButtonCreate">Add exercisse to routine</div>
        </Link>
      ) : null}

      <br />
      <br />
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
        <button onClick={handleDeleteRoutine} className="ButtonCreate">
          Delete the routine
        </button>
      ) : null}
      <AllButtons />
    </div>
  );
}

export default RoutineDetail;
