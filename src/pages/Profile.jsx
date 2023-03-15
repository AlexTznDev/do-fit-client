import AllButtons from "../components/AllButtons";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { profileSerivce } from "../services/profile.services";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { routineService } from "../services/routine.services";

import { FaUserFriends } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";

import ButtonOut from "../components/ButtonOut";

function Profile() {
  const navigate = useNavigate();

  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);

  const [allRoutines, setallRoutines] = useState(null);
  const [isFetching, setisFetching] = useState(true);

  const [isFetchingRoutine, setisFetchingRoutine] = useState(true);

  const [showingFriends, setShowingFriends] = useState(false);

  useEffect(() => {
    getData();
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

  const getData = async () => {
    setisFetching(true);

    try {
      const response = await profileSerivce();
      console.log(response.data);
      setUserData(response.data);
      setisFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showFriends = () => {
    setShowingFriends(!showingFriends);
  };

  if (isFetching === true) {
    return;
    <h1>...Searching</h1>;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  return (
    <div>
      <ButtonOut handleLogout={handleLogout} />

      <div className="mainContainer">
        <div className="containerImgProfil">
          <img
            className="imgWrapper"
            src={userData.imageProfile}
            alt="img"
            width="100%"
          />
        </div>

        <div>
          <h4 style={{ marginTop: "2rem" }}>{userData.name}</h4>
          {/* <p>Age: {userData.age} yrs</p>
          <p>Weight: {userData.weight} kg</p>
          <p>Height: {userData.height} cm</p> */}
        </div>

        <Link
          to={`/profile/${userData._id}/edit`}
          className={"ButtonCreate"}
          style={{ marginTop: "2rem" }}
        >
          <p style={{ fontWeight: "300" }}>Edit Profile</p>
        </Link>

        <div onClick={showFriends} className="ButtonHome" style={{marginTop:"1rem", marginBottom:"1rem"}}>
          <FaUserFriends size="1.3rem" color="rgba(33, 33, 33, 0.853)" />
          <h5>Following</h5>
          {showingFriends
            ? userData.friends.map((each) => {
                return (
                  // <p key={each._id}>{each.name}</p>
                  <Link
                    to={
                      each._id === userData._id
                        ? "/profile"
                        : `/profile/${each._id}`
                    }
                  >
                    <p>{each.name}</p>
                  </Link>
                );
              })
            : null}

          {/* <h4 >{userData.friends.length}</h4> */}
        </div>
      </div>
      <div
        style={{
          height: "1rem",
          backgroundColor: "rgba(33, 33, 33, 0.065)",
          borderTop: "1px solid rgba(33, 33, 33, 0.190)",
          borderBottom: "1px solid rgba(33, 33, 33, 0.190)",
        }}
      ></div>
      <div className="containerRoutineProfil">
        <div className="wrapperRoutine">
          {isFetchingRoutine ? (
            <h2>...is fetching</h2>
          ) : (
            allRoutines.map((eachRoutine) => {
              return (
                <Link
                className="wrapperNameRoutineProfile"
                 key={eachRoutine._id} to={`/routine/${eachRoutine._id}`}>
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
          style={{ position: "absolute", bottom: "10px" }}
          to={"/routine/create"}
        >
          <MdAddCircle size="2rem" />
        </Link>
      </div>

      <div className="ajustDiv"></div>
      <AllButtons />
    </div>
  );
}

export default Profile;
