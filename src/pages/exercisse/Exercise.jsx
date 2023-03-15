import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import AllButtons from "../../components/AllButtons";
import { exerciseSerivce } from "../../services/exercise.services";

import { BsInfoSquare } from "react-icons/bs";
import { MdAddCircle } from "react-icons/md";

import { AuthContext } from "../../context/auth.context";

function Exercise() {

  const { loggedUser } = useContext(AuthContext)
   
  const params = useParams();
  const { idRoutine } = params;

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
      const response = await exerciseSerivce();

      setAllExercise(response.data);
      setisFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer" style={{ paddingTop: "2rem" }}>
      <h2>Exercisse List</h2>
      <br />
      <br />
      <br />

      <AllButtons />

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
                height: "7rem",
              }}
              to={`/routine/${idRoutine}/exercise/${eachExercisse._id}`}
              key={eachExercisse._id + index}
            >
              <div className="containerInfoExercisse">
                <div>
                  <div className="containerImgExercise">
                    <img
                      src={eachExercisse.image}
                      alt={eachExercisse.name}
                      className="imgExercise"
                    />
                  </div>
                </div>

                <div className="ColumnDisplay">
                  <h4>{eachExercisse.name}</h4>
                  <p className="grey">{eachExercisse.category}</p>
                  <p className="grey">{eachExercisse.tagline}</p>
                  <p className="grey">{eachExercisse.calories} calories</p>
                </div>

                <BsInfoSquare size="2rem" color="#f4a261" />
              </div>
            </Link>
          );
        })
      ) : (
        allExercise.map((eachExercisse, index) => {
          return (
            <div
              key={eachExercisse._id + index}
              style={{
                height: "7rem",
                display: "flex",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer",
                }}
                to={`/exercise/${eachExercisse._id}/details`}
              >
                <div className="containerInfoExercisse">
                  <div>
                    <div className="containerImgExercise">
                      <img
                        src={eachExercisse.image}
                        alt={eachExercisse.name}
                        className="imgExercise"
                      />
                    </div>
                  </div>

                  <div className="ColumnDisplay">
                    <h4>{eachExercisse.name}</h4>
                    <p className="grey">{eachExercisse.category}</p>
                    <p className="grey">{eachExercisse.tagline}</p>
                    <p className="grey">{eachExercisse.calories} calories</p>
                  </div>

                  <BsInfoSquare size="2rem" color="#f4a261" />
                </div>
              </Link>
            </div>
          );
        })
      )}

      {loggedUser.role ==="admin" ? <Link
        className={"ButtonHome"}
        style={{ marginTop: "4rem" }}
        to={"/exercise/create"}
      >
        <MdAddCircle size="2rem" />
        <p className="textButton">Add one</p>
      </Link> : null  }
      
    </div>
  );
}

export default Exercise;
