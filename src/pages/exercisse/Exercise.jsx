import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { exerciseSerivce } from "../../services/exercise.services";

function Exercise() {
  const [allExercise, setAllExercise] = useState(null);
  const [isFetching, setisFetching] = useState(true);

  useEffect(() => {
    getDataAllExercisse();
  }, []);

  const getDataAllExercisse = async () => {
    try {
      const response = await exerciseSerivce();

      setAllExercise(response.data);
      setisFetching(false);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>



    <h2>Exercisse List</h2>
    <br /><br />

      {
        
        isFetching ? (<h1>...buscando</h1>):(

          allExercise.map((eachExercisse) => {
        return (        
          <Link
          style={{textDecoration:"none", color:"black", cursor:"pointer"}}
            to={`/exercise/${eachExercisse._id}/details`}
            key={eachExercisse._id}
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

        )
        
        
}

    </div>
  );
}

export default Exercise;
