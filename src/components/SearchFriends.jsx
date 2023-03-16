import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchUserService } from "../services/search.seervices";
import AllButtons from "./AllButtons";

import logo from "../logo/logo-final.png";
import SearchingSpinner from "./SearchingSpinner";

function SearchFriends() {

  const navigate = useNavigate()  

  const [usersArr, setUsersArr] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [userToDisplay, setUserToDisplay] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const handleSearchChange = (event) => {
    if (event.target.value !== "") {
      setSearchUser(event.target.value);
      searchingUser(event.target.value);
    } else {
      setSearchUser(event.target.value);
      setUserToDisplay([]);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await searchUserService();
      setUsersArr(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error")
    }
  };

  const searchingUser = (username) => {
    const foundUser = usersArr.filter((eachUser) => {
      let eachUsernameMin = eachUser.name.toLowerCase();
      let userToSearchMin = username.toLowerCase();

      if (eachUsernameMin.includes(userToSearchMin)) {
        return true;
      } else {
        return false;
      }
    });

    setUserToDisplay(foundUser);
  };

  if (isFetching) {
    return <SearchingSpinner/>
  }

  return (
    <div className="searchContainer">
      <div className="inputSearchContainer">
        <label htmlFor="search"></label>
        <input
          type="text"
          name="search"
          value={searchUser}
          onChange={handleSearchChange}
          placeholder="Find user"
          
        />
        <button style={{cursor:"pointer"}} onClick={handleSearchChange}>Search</button>
      </div>

      {userToDisplay.length !== 0 ? null : (
        <div className="containerLogoFound">
          <img src={logo} alt="logo" className="imgWrapper" />
        </div>
      )}

      <div
        style={{
          padding: "2rem",
        }}
      >
        {userToDisplay.map((eachUser) => {
          return (
            <div key={eachUser._id} style={{ margin: "10px" }}>
              <Link to={`/profile/${eachUser._id}`}>
                <div className="containerImgAndName">
                  <div className="containerImgProfilFound">
                    <img
                      src={eachUser.imageProfile}
                      alt="imageProfile"
                      className="imgWrapper"
                    />
                  </div>

                  <p style={{ fontSize: "15px" }}>{eachUser.name}</p>
                </div>
              </Link>
            </div>

          );
        })}
      </div>

      <AllButtons />

    </div>
  );
}

export default SearchFriends;
