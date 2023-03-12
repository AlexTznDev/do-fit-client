import Routine from "./Routine"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { profileSerivce } from "../services/profile.services"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

function Profile() {

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
        <h2>Profile Page</h2>
        <Routine />
        <Link to={"/exercise"}>Exercise</Link>
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
      
      
    </div>
  )
}

export default Profile
