import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Exercisedetails() {
  const params = useParams();

  const { id } = params;

  const [detailsExercise, setDetailsExercise] = useState(null);
  const [isFetching, setisFetching] = useState(true);

  useEffect(() => {
    getDetailDataExercise();
  }, []);

  const getDetailDataExercise = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/exercise/${id}`
      );
      console.log(response.data);
      setDetailsExercise(response.data);
      setisFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isFetching ? null : (
        <div>
          <h2>{detailsExercise.name}</h2>
          <p>{detailsExercise.calories}</p>
          <p>{detailsExercise.category}</p>
          <p>{detailsExercise.description}</p>
          <p>{detailsExercise.videoUrl}</p>
        </div>
      )}
    </div>
  );
}

export default Exercisedetails;
