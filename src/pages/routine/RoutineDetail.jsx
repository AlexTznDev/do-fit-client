import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllButtons from "../../components/AllButtons";
import ProfilDescription from "../../components/ProfilDescription";

import { Link } from "react-router-dom";
import axios from "axios";
import RoutineExercise from "./RoutineExercise";

function RoutineDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;


  const [routineData, setRoutineData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const [isUserRoad, setUserRoad] = useState(
    window.location.href.includes("user") ? true : false
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/routine/${id}`
      );

      setRoutineData(response.data.exercises);
      console.log(response.data.exercises.length)
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRoutine = async () => {
    try {
      await axios.delete(`http://localhost:5005/api/routine/${id}`);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer">
      <ProfilDescription />
      <AllButtons />

      {isFetching ? (
        <h2>... buscando</h2>
      ) : (
        routineData.map((eachExercisse) => {
          return (
            <div>
              {!isUserRoad ? (
                <Link
                  to={`/routine/${id}/exercise/${eachExercisse._id}/edit`}
                  key={eachExercisse.exercisesId._id}
                >
                  <h4>{eachExercisse.exercisesId.name}</h4>
                </Link>
              ) : (
                <Link
                  to={`/routine/${id}/exercise/${eachExercisse._id}/user`}
                  key={eachExercisse.exercisesId._id}
                >
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
      {isFetching || routineData.length === 0 ? null : (
        <Link  to={`/routine/${id}/exercise/${routineData[0]._id}/start/${routineData.length}`}>
          <div className="ButtonStart">Start the routine!!</div>
        </Link>
      )}

      {!isUserRoad ? (
        <button onClick={handleDeleteRoutine} className="ButtonCreate">
          Delete the routine
        </button>
      ) : null}
    </div>
  );
}

export default RoutineDetail;
