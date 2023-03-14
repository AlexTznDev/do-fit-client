import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllButtons from "../../components/AllButtons";
import ProfilDescription from "../../components/ProfilDescription";

import { Link } from "react-router-dom";



//* all services import
import { routineDetailService } from "../../services/routine.services";
import { deleteRoutineService } from "../../services/routine.services";


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
      const response = await routineDetailService(id)


      setRoutineData(response.data.exercises);
  
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRoutine = async () => {
    try {
      await deleteRoutineService(id)
      
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
            <div key={eachExercisse.exercisesId._id}>
              {!isUserRoad ? (
                <Link
                  to={`/routine/${id}/exercise/${eachExercisse._id}/edit`}
                  
                >
                  <h4>{eachExercisse.exercisesId.name}</h4>
                </Link>
              ) : (
                <Link
                  to={`/routine/${id}/exercise/${eachExercisse._id}/user`}
              
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
