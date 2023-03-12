import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { exerciseDetailService } from "../../services/exercise.services";
import { exerciseDeleteService } from "../../services/exercise.services";

function Exercisedetails() {
  const params = useParams();
  const { id } = params;

  const navigate = useNavigate()

  const [detailsExercise, setDetailsExercise] = useState(null);
  const [isFetching, setisFetching] = useState(true);

  useEffect(() => {
    getDetailDataExercise();
  }, []);

  const getDetailDataExercise = async () => {
    try {
      const response = await exerciseDetailService(id)

      setDetailsExercise(response.data);
      setisFetching(false);
    } catch (error) {
      console.log(error);
    }
  };



  const handleDeleteExercise = async()=>{

try {
  
await exerciseDeleteService(id)
navigate("/exercise")

} catch (error) {
  console.log(error)
}

    
  }

  return (
    <div>
      {isFetching ? null : (
        <div>
          <h2>{detailsExercise.name}</h2>
          <p>{detailsExercise.calories}</p>
          <p>{detailsExercise.category}</p>
          <p>{detailsExercise.description}</p>
          <p>{detailsExercise.videoUrl}</p>
          <p>{detailsExercise.image}</p>

          <button onClick={handleDeleteExercise}>Delete</button>
          <Link to={`/exercise/${detailsExercise._id}/edit`}>Edit</Link>
        </div>
      )}
    </div>
  );
}

export default Exercisedetails;
