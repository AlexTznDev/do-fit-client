import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AllButtons from "../components/AllButtons";
import ProfilDescription from "../components/ProfilDescription"
import Routine from "./Routine"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { profileSerivce } from "../services/profile.services"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

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


  const navigate = useNavigate()

  const { isLoggedIn, authenticateUser} = useContext(AuthContext)

  const [ userData, setUserData ] = useState(null)
  const [ isFetching, setisFetching ] = useState(true)

  useEffect(() => {
    getData();
  }, []);

  const getData = async() => {
    setisFetching(true)

    try {
      const response = await profileSerivce()
      console.log(response.data)
      setUserData(response.data)
      setisFetching(false)
    } catch (error) {
      console.log(error)
    }
  }
  
  if(isFetching === true) {
    return
      (<h1>...Searching</h1>)
  } 
  
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticateUser()
    navigate("/")
  }

  
  return (
    <div>
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
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div style={{borderStyle: "solid", width: "30vw"}}>
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
        <Link to={`/profile/${userData._id}/edit`}>Edit Profile</Link>
      </div>
      

      <Link to={"/routine/create"}>
        <div className={"ButtonCreate"}></div>
      </Link>
    </div>
  );
}

export default Profile;
