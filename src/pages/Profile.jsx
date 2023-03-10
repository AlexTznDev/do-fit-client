import Routine from "./Routine"
import { Link } from "react-router-dom"



function Profile() {
  return (
    <div>
      <h2>Profile Page</h2>
      <Routine />
      <Link to={"/exercise"}>Exercise</Link>
      
    </div>
  )
}

export default Profile
