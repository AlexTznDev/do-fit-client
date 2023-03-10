import { Link } from "react-router-dom"
import Routine from "./Routine"



function Profile() {
  return (
    <div>
      
      <Link to="/">Home</Link>
      <h2>This is your Profile Zone</h2>
      
      <div>
          <img src="" alt="profilePicture" />
          <p>Your name</p>
          <p>Age</p>
          <p>Weight</p>
          <p>Height</p>        
      </div>

      <div>
      <Link to="/routine">My Routines</Link>
      </div>
      
      
    </div>
  )
}

export default Profile
