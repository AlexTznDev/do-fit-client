import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AllButtons from "../components/AllButtons";
import ProfilDescription from "../components/ProfilDescription"

function Profile() {
  const [allRoutines, setallRoutines] = useState(null);
  const [isFetching, setisFetching] = useState(true);

  useEffect(() => {
    getDataAllRoutines();
  }, []);

  const getDataAllRoutines = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/routine");
      setallRoutines(response.data);
      setisFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ProfilDescription/>

      <AllButtons />

      <br />
      <br />

      {isFetching ? (
        <h2>...is fetching</h2>
      ) : (
        allRoutines.map((eachRoutine) => {
          return (
            <Link key={eachRoutine._id} to={`/routine/${eachRoutine._id}`}>
              <div>
                {/* <img src="first image from exercisse" alt="" /> */}
                <h2>{eachRoutine.name}</h2>
              </div>
            </Link>
          );
        })
      )}

      <Link to={"/routine/create"}>
        <div className={"ButtonCreate"}></div>
      </Link>
    </div>
  );
}

export default Profile;
