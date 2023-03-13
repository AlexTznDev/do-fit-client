import axios from "axios";
import AllButtons from "../components/AllButtons";
import ProfilDescription from "../components/ProfilDescription";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { profileSerivce } from "../services/profile.services";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import { routineUserService } from "../services/routine.services";


function ProfileFoundUser() {
    
    const params = useParams()
    const navigate = useNavigate();

    const {idFoundUser} = params
    console.log(idFoundUser)

    //const { isLoggedIn, authenticateUser } = useContext(AuthContext);
  
    const [userData, setUserData] = useState(null);
    const [isFetching, setisFetching] = useState(true);

    const [allRoutines, setallRoutines] = useState(null);
    const [isFetchingRoutine, setisFetchingRoutine] = useState(true);
  
    useEffect(() => {
      getData();
      getDataAllRoutines();
    }, []);
  
    const getDataAllRoutines = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/userInformation/${idFoundUser}`)
        setallRoutines(response.data);
        console.log(response)
        setisFetchingRoutine(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    const getData = async () => {
      setisFetching(true);
  
      try {
        const response = await axios.get(`http://localhost:5005/api/profile/${idFoundUser}`)
        console.log(response.data);
        setUserData(response.data);
        setisFetching(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    if (isFetching === true) {
      return;
      <h1>...Searching</h1>;
    }
  
    // const handleLogout = () => {
    //   localStorage.removeItem("authToken");
    //   authenticateUser();
    //   navigate("/");
    // };

  return (
    <div className="mainContainer">
      {/* <div>
        <button onClick={handleLogout}>Logout</button>
      </div> */}
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
        {/* <Link to={`/profile/${userData._id}/edit`}>Edit Profile</Link> */}
      </div>

      <br />
      <br />
      <AllButtons/>

      <br />
      <br />

      {isFetchingRoutine ? 
        <h2>...is fetching</h2>
       : 
        allRoutines.map((eachRoutine) => {
          return (
            <Link key={eachRoutine._id} to={`/routine/${eachRoutine._id}/user`}>
              <div>
                <h2>{eachRoutine.name}</h2>
              </div>
            </Link>
          );
        })
      }

      {/* <Link to={"/routine/create"}>
        <div className={"ButtonCreate"}></div>
      </Link> */}
    </div>
  )
}

export default ProfileFoundUser