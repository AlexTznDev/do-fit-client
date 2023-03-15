import AllButtons from "../../components/AllButtons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  followFoundUserService,
  profileSerivce,
  profileUserService,
} from "../../services/profile.services";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams } from "react-router-dom";
import { routineUserService } from "../../services/routine.services";

function ProfileFoundUser() {
  const params = useParams();
  const navigate = useNavigate();

  const { idFoundUser } = params;
  

  //const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [isFetching, setisFetching] = useState(true);

  const [allRoutines, setallRoutines] = useState(null);
  const [isFetchingRoutine, setisFetchingRoutine] = useState(true);

  const [visitorData, setVisitorData] = useState(null);
  const [areFriends, setAreFriends] = useState(false);

  useEffect(() => {
    getData();
    getDataAllRoutines();
  }, []);

  const getDataAllRoutines = async () => {
    try {
      const response = await routineUserService(idFoundUser);

      setallRoutines(response.data);
      console.log(response);
      setisFetchingRoutine(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    setisFetching(true);

    try {
      const response = await profileUserService(idFoundUser);
      //console.log(response.data);

      const response2 = await profileSerivce();
     // console.log(response2.data);

      setUserData(response.data);
      setVisitorData(response2.data);
      setisFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const followFoundUser = async () => {
    try {
      const response = await followFoundUserService(idFoundUser);
      //console.log(response);
      setAreFriends(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching === true) {
    return;
    <h1>...Searching</h1>;
  }

  return (
    <div className="mainContainer">
      <div style={{ borderStyle: "solid", width: "30vw" }}>
        <img src={userData.imageProfile} alt="img" width="200px" />
        <div>
          <h3>{userData.name}</h3>
          <p>Age: {userData.age} yrs</p>
          <p>Weight: {userData.weight} kg</p>
          <p>Height: {userData.height} cm</p>
        </div>

        <div>
          <h3>Friends: {userData.friends}</h3>
        </div>
      </div>

      <br />
      <br />
      <AllButtons />
      {visitorData.friends.includes(idFoundUser) ? null : areFriends ? null : (
        <button type="submit" onClick={followFoundUser}>
          Follow
        </button>
      )}

      <br />
      <br />

      {isFetchingRoutine ? (
        <h2>...is fetching</h2>
      ) : (
        allRoutines.response1.map((eachRoutine) => {
          return (
            <Link key={eachRoutine._id} to={`/routine/${eachRoutine._id}/user`}>
              <div>
                <h2>{eachRoutine.name}</h2>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}

export default ProfileFoundUser;
