import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { useState, useEffect } from "react";

import { routineService } from "../../services/routine.services";

function ContainerRoutineProfil() {
  const [allRoutines, setallRoutines] = useState(null);

  const [isFetchingRoutine, setisFetchingRoutine] = useState(true);

  useEffect(() => {
    getDataAllRoutines();
  }, []);

  const getDataAllRoutines = async () => {
    try {
      const response = await routineService();
      setallRoutines(response.data);
      setisFetchingRoutine(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containerRoutineProfil">
      <div className="wrapperRoutine">
        {isFetchingRoutine ? (
          <h2>...is fetching</h2>
        ) : (
          allRoutines.map((eachRoutine) => {
            return (
              <Link
                className="wrapperNameRoutineProfile"
                key={eachRoutine._id}
                to={`/routine/${eachRoutine._id}`}
              >
                <div>
                  {/* <img src="first image from exercisse" alt="" /> */}
                  <h2>{eachRoutine.name}</h2>
                </div>
              </Link>
            );
          })
        )}
      </div>

      <Link
        className={"ButtonHome"}
        style={{ position: "absolute", bottom: "10px" }}
        to={"/routine/create"}
      >
        <MdAddCircle size="2rem" />
        <p className="textButton">Create routine</p>
      </Link>
    </div>
  );
}

export default ContainerRoutineProfil;
