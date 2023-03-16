import AllButtons from "../../components/AllButtons";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { profileSerivce } from "../../services/profile.services";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import { FaUserFriends } from "react-icons/fa";

import ButtonOut from "../../components/ButtonOut";
import ContainerRoutineProfil from "../routine/ContainerRoutineProfil";
import SearchingSpinner from "../../components/SearchingSpinner";

function Profile() {
  
  const navigate = useNavigate();
  const params = useParams();

  const {authenticateUser} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isFetching, setisFetching] = useState(true);
  const [showingFriends, setShowingFriends] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setisFetching(true);

    try {
      const response = await profileSerivce();
      setUserData(response.data);
      setisFetching(false);
    } catch (error) {
      navigate("/error")
    }
  };

  const showFriends = () => {
    setShowingFriends(!showingFriends);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  return (
    <div>
      {isFetching ? (
        <SearchingSpinner/>
      ) : (
        <div>
          <ButtonOut handleLogout={handleLogout} />

          <div className="mainContainer">
            <div className="containerImgProfil">
              <img
                className="imgWrapper"
                src={userData.imageProfile}
                alt="img"
                width="100%"
              />
            </div>

            <div>
              <h3 style={{ marginTop: "2rem" }}>{userData.name}</h3>
            </div>

            <Link
              to={`/profile/${userData._id}/edit`}
              className={"ButtonCreate"}
              style={{ marginTop: "2rem" }}
            >
              <p style={{ fontWeight: "300" }}>Edit Profile</p>
            </Link>

            <div
              onClick={showFriends}
              className="ButtonHome"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              <FaUserFriends size="1.3rem" color="f4a261" />
              <h5>Following</h5>
              {showingFriends
                ? userData.friends.map((each) => {
                    return (
                      <Link key={each._id}
                        to={
                          each._id === userData._id
                            ? "/profile"
                            : `/profile/${each._id}`
                        }
                      >
                        <p>{each.name}</p>
                      </Link>
                    );
                  })
                : null}
            </div>
          </div>
          <div
            className="greyLine"
            style={{
              height: "1rem",
              backgroundColor: "rgba(33, 33, 33, 0.065)",
              borderTop: "1px solid rgba(33, 33, 33, 0.190)",
              borderBottom: "1px solid rgba(33, 33, 33, 0.190)",
            }}
          ></div>
          {params.id !== undefined ? null : (
            <div>
              {" "}
              <ContainerRoutineProfil /> <div className="ajustDiv"></div>
            </div>
          )}

          <AllButtons />
        </div>
      )}
    </div>
  );
}

export default Profile;
