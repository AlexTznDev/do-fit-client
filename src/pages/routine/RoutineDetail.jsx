import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllButtons from "../../components/AllButtons";
import ProfilDescription from "../../components/ProfilDescription";

import { Link } from "react-router-dom";
import axios from "axios";

function RoutineDetail() {
  const params = useParams();
  const { id } = params;

  const [routineData, setRoutineData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/routine/${id}`
      );


      console.log(response.data.exercises)
      setRoutineData(response.data.exercises);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ProfilDescription />
      <AllButtons />

      {isFetching ? (
        <h2>... buscando</h2>
      ) : (
        routineData.map((eachExercisse) => {
          return (
            <Link to={`/routine/${id}/exercise/${eachExercisse._id}`} key={eachExercisse.exercisesId._id}>
              <h4>{eachExercisse.exercisesId.name}</h4>
            </Link>
          );
        })
      )}

      <Link to={`/routine/${id}/exercise`} >
        <div className="ButtonCreate"></div>
      </Link>
    </div>
  );
}

export default RoutineDetail;
