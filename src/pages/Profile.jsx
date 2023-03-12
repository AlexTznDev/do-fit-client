import Routine from "./Routine"
import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import { profileSerivce } from "../services/profile.services"

function Profile() {

  useEffect(() => {
    getData();
  }, []);

  const getData = async() => {

    try {
      const responst = await profileSerivce()
      console.log(responst)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
      <h2>Profile Page</h2>
      <Routine />
      <Link to={"/exercise"}>Exercise</Link>
      
    </div>
  )
}

export default Profile
