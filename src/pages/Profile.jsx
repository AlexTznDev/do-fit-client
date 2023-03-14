import AllButtons from "../components/AllButtons";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { profileSerivce } from "../services/profile.services";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { routineService } from "../services/routine.services";

function Profile() {
  const navigate = useNavigate();

  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);

  const [allRoutines, setallRoutines] = useState(null);
  const [isFetching, setisFetching] = useState(true);

  const [isFetchingRoutine, setisFetchingRoutine] = useState(true);
  
  const [ showingFriends, setShowingFriends ] = useState(false)

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
    
    setShowingFriends(!showingFriends)
  }

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
    <div className="mainContainer">
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div style={{ borderStyle: "solid", width: "30vw", height: "600px"}}>
        <img src={userData.imageProfile} alt="img" width="200px" />
        <div>
          <h3>{userData.name}</h3>
          <p>Age: {userData.age} yrs</p>
          <p>Weight: {userData.weight} kg</p>
          <p>Height: {userData.height} cm</p>
        </div>

        <div>
          <h3>Following</h3>

          <h4 onClick={showFriends}>{userData.friends.length}</h4>
          {showingFriends ? (userData.friends.map((each) =>{
            return(
              // <p key={each._id}>{each.name}</p>
              <Link to= {each._id === userData._id ? "/profile": `/profile/${each._id}`}><p>{each.name}</p></Link>
            )
          })): null} 
          
          
        </div>
          
        <Link to={`/profile/${userData._id}/edit`} className={"ButtonCreate"}>Edit Profile</Link>
      
      </div>

      <br />
      <br />
      <AllButtons />

      <br />
      <br />

      {isFetchingRoutine ? (
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
        <div className={"ButtonCreate"}>create a new routine</div>
      </Link>
    </div>
  );
}

export default Profile;
