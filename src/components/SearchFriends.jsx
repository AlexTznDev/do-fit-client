
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { searchUserService } from "../services/search.seervices"
import AllButtons from "./AllButtons"

function SearchFriends() {

    const [ usersArr, setUsersArr] = useState(null)
    const [ searchUser, setSearchUser] = useState("")
    const [ userToDisplay, setUserToDisplay] = useState([])
    const [ isFetching, setIsFetching ] = useState(true)

    const handleSearchChange = (event) => {
        
        if(event.target.value !== ""){
            setSearchUser(event.target.value)
            searchingUser(event.target.value)
        } else {
            setSearchUser(event.target.value)
            setUserToDisplay([])
        }
        
        

    } 

    useEffect(() => {

        getUsers()

    }, [])

    const getUsers = async () => {

        try {

            const response = await searchUserService()
            console.log(response.data)
            setUsersArr(response.data)
            setIsFetching(false)

        } catch (error) {
            console.log(error)
        }
    }

    const searchingUser = (username) => {

        const foundUser = usersArr.filter((eachUser) => {

            let eachUsernameMin = eachUser.name.toLowerCase()
            let userToSearchMin = username.toLowerCase()

            if(eachUsernameMin.includes(userToSearchMin)){
                return true
            } else {
                return false
            }

        })

        setUserToDisplay(foundUser)
        console.log(foundUser)
    }
    
    if(isFetching) {
        return (
            <h3>...Buscando</h3>
        )
    }


  return (
    <div>
        
            <label htmlFor="search">Search User</label>
            <input type="text" name="search" value={searchUser}  onChange={handleSearchChange}/>

            <div>
                {userToDisplay.map((eachUser) => {
                    return(
                        <div key={eachUser._id} style={{margin:"40px"}}>
                            <Link to={`/profile/${eachUser._id}`}>
                            <img  src={eachUser.imageProfile} alt="imageProfile" width="100px"/>
                            <p style={{margin:"0px"}} >{eachUser.name}</p>
                            </Link>
                            
                        </div>
                    )
                })}
            </div>
        <AllButtons/>
        
    </div>
  )
}

export default SearchFriends