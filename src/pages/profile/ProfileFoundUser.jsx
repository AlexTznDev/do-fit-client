import AllButtons from "../../components/AllButtons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { followFoundUserService } from "../../services/profile.services";
import { profileSerivce } from "../../services/profile.services";

import { useParams } from "react-router-dom";
import { routineUserService } from "../../services/routine.services";

import { FaUserFriends } from "react-icons/fa";


function ProfileFoundUser() {
  const params = useParams();
  const { idFoundUser } = params;

  //const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [isFetching, setisFetching] = useState(true);

  const [allRoutines, setallRoutines] = useState(null);
  const [isFetchingRoutine, setisFetchingRoutine] = useState(true);

  const [visitorData, setVisitorData] = useState(null);
  const [areFriends, setAreFriends] = useState(false);

  const [showingFriends, setShowingFriends] = useState(false);

  useEffect(() => {
    getDataAllRoutines();
  }, [idFoundUser]);

  const getDataAllRoutines = async () => {
    setisFetching(true);

    try {
      const response = await routineUserService(idFoundUser);

      const response2 = await profileSerivce();
      setVisitorData(response2.data);
      setisFetching(false);

      setallRoutines(response.data);
      setUserData(response.data);
      console.log(response);
      setisFetchingRoutine(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showFriends = () => {
    setShowingFriends(!showingFriends);
  };

  const followFoundUser = async () => {
    try {
      const response = await followFoundUserService(idFoundUser);
      setAreFriends(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching === true) {
    return <h1>...Searching</h1>;
  }

  const found = visitorData.friends.find((user) => user._id === idFoundUser);

  return (
    <div className="mainContainer">
      <div className="containerImgProfil">
        <img
          className="imgWrapper"
          src={userData.infoFoundUser.imageProfile}
          alt="img"
          width="100%"
        />
       </div>

        <div>
          <h4 style={{ marginTop: "2rem" }}>{userData.infoFoundUser.name}</h4>
        </div>
          
          <div>


          
          {/* <p>Age: {userData.infoFoundUser.age} yrs</p>
          <p>Weight: {userData.infoFoundUser.weight} kg</p>
          <p>Height: {userData.infoFoundUser.height} cm</p>
        </div> */}

            <div
              onClick={showFriends}
              className="ButtonHome"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
            <FaUserFriends size="1.3rem" color="f4a261" />
          <h3>Friends</h3>
          {showingFriends? userData.infoFoundUser.friends.map((each) => {
            return (
              <div key={each._id}>
                <Link
                  to={
                    each._id === visitorData._id
                      ? "/profile"
                      : `/profile/${each._id}`
                  }
                >
                  {each.name}
                </Link>
              </div>
            ) 
          }) : null}
        </div>
      </div>

      <br />
      <br />
      <AllButtons />

      <div>
        {areFriends || found ? null : (
          <button type="submit" onClick={followFoundUser}>
            Follow
          </button>
        )}
      </div>

      <br />
      <br />

      {isFetchingRoutine ? (
        <h2>...is fetching</h2>
      ) : (
        allRoutines.rutinasFoundUser.map((eachRoutine) => {
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
