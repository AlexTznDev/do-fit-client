import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { profileEditService, profileSerivce } from "../services/profile.services"

function ProfileEdit() {

    const navigate = useNavigate()

    const params = useParams()
    const {id} = params

    const [ username, setUsername ] = useState("")
    const [ profileImage, setProfileImage] = useState("")
    const [ userAge, setUserAge ] = useState(0)
    const [ userHeight, setUserHeight] = useState(0)
    const [ userWeight, setUserWeight] = useState(0)


    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    
    const handleProfileImageChange = (event) => {
        setProfileImage(event.target.value)
    }

    const handleUserAgeChange = (event) => {
        setUserAge(event.target.value)
    }

    const handleUserHeightChange = (event) => {
        setUserHeight(event.target.value)
    }

    const handleUserWeightChange = (event) => {
        setUserWeight(event.target.value)
    }

    useEffect(()=> {
        getData()
    },[]) 

    const getData = async() => {

        try {
            const response = await profileSerivce()
            console.log(response.data)
            const {name, imageProfile, age, weight, height} = response.data
            console.log(imageProfile)
            setUsername(name)
            setProfileImage(imageProfile)
            setUserAge(age)
            setUserWeight(weight)
            setUserHeight(height)

        } catch (error) {
          console.log(error)  
        }

    }

    const handleUpdateProfile = async(event) => {
        event.preventDefault()
        
        const updatedProfileInformation = {
            name: username,
            imageProfile: profileImage,
            age: userAge,
            weight: userWeight,
            height: userHeight 
        }

        try {
            await profileEditService(id,updatedProfileInformation)
            navigate("/profile")
            
        } catch (error) {
            console.log(error)
        }
    }




  return (
    <div>
        <h3>Edit Profile</h3>

        <form>
            <label htmlFor="name">Username: </label>
            <input type="text" name="name" value={username} onChange={handleUsernameChange}/>
            <br />
            <label htmlFor="imageProfile">Profile picture: </label>
            <input type="text" name="imageProfile" value={profileImage} onChange={handleProfileImageChange}/>
            <br />
            <label htmlFor="age">Age: </label>
            <input type="number" name="age" value={userAge} onChange={handleUserAgeChange}/>
            <br />
            <label htmlFor="weight">Weight: </label>
            <input type="number" name="weight" value={userWeight} onChange={handleUserWeightChange}/>
            <br />
            <label htmlFor="height">Height: </label>
            <input type="number" name="height" value={userHeight} onChange={handleUserHeightChange}/>
            <br />
            <button onClick={handleUpdateProfile}>Update</button>
        </form>
    </div>

  )
}

export default ProfileEdit