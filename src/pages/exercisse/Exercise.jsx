import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import AllButtons from "../../components/AllButtons";

function Exercise() {
  const params = useParams();
  const {idRoutine} = params

  const [allExercise, setAllExercise] = useState(null);
  const [isFetching, setisFetching] = useState(true);
  const [isRoutineRoad, setisRoutineRoad] = useState(false);

  useEffect(() => {
    getDataAllExercisse();
    if (idRoutine) {
      setisRoutineRoad(true);
    }
  }, []);

  const getDataAllExercisse = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/exercise");

      setAllExercise(response.data);
      setisFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Exercisse List</h2>
      <br />
      <br />

      <AllButtons />
      <br />

      {isFetching ? (
        <h1>...buscando</h1>
      ) : isRoutineRoad ? (

        allExercise.map((eachExercisse, index) => {
          return (
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer",
              }}
              to={`/routine/${idRoutine}/exercise/${eachExercisse._id}`}
              key={eachExercisse._id + index}
            >
              <div className="containerInfoExercisse">
                <h3>{eachExercisse.name}</h3>
                <h5>{eachExercisse.category}</h5>
                <p>{eachExercisse.tagline}</p>
                <p>{eachExercisse.calories}</p>
              </div>

              <br />
              <br />
            </Link>
          );
        })
      ) : (
        allExercise.map((eachExercisse, index) => {
          return (
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer",
              }}
              to={`/exercise/${eachExercisse._id}/details`}
              key={eachExercisse._id + index}
            >
              <div className="containerInfoExercisse">
                <h3>{eachExercisse.name}</h3>
                <h5>{eachExercisse.category}</h5>
                <p>{eachExercisse.tagline}</p>
                <p>{eachExercisse.calories}</p>
              </div>

              <br />
              <br />
            </Link>
          );
        })
      )}
      <Link to={"/exercise/create"}>Create Exercise</Link>
    </div>
  );
}

export default Exercise;
