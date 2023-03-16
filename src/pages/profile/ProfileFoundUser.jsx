import AllButtons from "../../components/AllButtons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { followFoundUserService } from "../../services/profile.services";
import { profileSerivce } from "../../services/profile.services";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams } from "react-router-dom";
import { routineUserService } from "../../services/routine.services";

import { FaUserFriends } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";

import abbs from "../../image/Abbs.jpg"
import bodyWeight from "../../image/bodyWeight.jpg"
import breathing from "../../image/breathing.jpg"
import cardio from "../../image/cardio.jpg"
import lowerBody from "../../image/lowerBody.jpg"
import stretching from "../../image/stretching.jpg"
import upperBody from "../../image/upperBody.jpg"

function ProfileFoundUser() {
  const params = useParams();
  const { idFoundUser } = params;

  //const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [isFetching, setisFetching] = useState(true);

  const [allRoutines, setallRoutines] = useState(null);
  const [isFetchingRoutine, setisFetchingRoutine] = useState(true);

  const [visitorData, setVisitorData] = useState(null);
  const [areFriends, setAreFriends] = useState(false);

  const [showingFriends, setShowingFriends] = useState(false);

  const [isUserRoad, setUserRoad] = useState(
    window.location.href.includes("routine") ? true : false
  );



  useEffect(() => {
    getDataAllRoutines();
  }, [idFoundUser]);

  const getDataAllRoutines = async () => {
    setisFetching(true);

    try {
      const response = await routineUserService(idFoundUser);

      const response2 = await profileSerivce();
      setVisitorData(response2.data);
      setisFetching(false);

      setallRoutines(response.data);
      setUserData(response.data);
      console.log(response);
      setisFetchingRoutine(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showFriends = () => {
    setShowingFriends(!showingFriends);
  };

  const followFoundUser = async () => {
    try {
      const response = await followFoundUserService(idFoundUser);
      setAreFriends(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching === true) {
    return <h1>...Searching</h1>;
  }

  const found = visitorData.friends.find((user) => user._id === idFoundUser);

  return (
    <div>
      <div className="mainContainer">
        <div className="containerImgProfil">
          <img
            className="imgWrapper"
            src={userData.infoFoundUser.imageProfile}
            alt="img"
            width="100%"
          />
        </div>

        <div>
          <h3 style={{ marginTop: "2rem" }}>{userData.infoFoundUser.name}</h3>
        </div>

        <div>
          {/* <p>Age: {userData.infoFoundUser.age} yrs</p>
          <p>Weight: {userData.infoFoundUser.weight} kg</p>
          <p>Height: {userData.infoFoundUser.height} cm</p>
        </div> */}

          <div
            
            
            style={{display: "flex", flexDirection:"row",  marginTop: "1rem", marginBottom: "1rem" }}
          >
            <div className="ButtonHome" onClick={showFriends} style={{display:"flex", flexDirection: "column", alignItems:"center", margin:"2rem"}}>
            <FaUserFriends size="1.3rem" color="f4a261" />
            <h5>Following</h5>
            {showingFriends
              ? userData.infoFoundUser.friends.map((each) => {
                  return (
                    <div key={each._id} style={{margin: "0.5rem"}}>
                      <Link
                        to={
                          each._id === visitorData._id
                            ? "/profile"
                            : `/profile/${each._id}`
                        }
                      >
                        {each.name}
                      </Link>
                    </div>
                  );
                })
              : null}
              </div>
               {areFriends || found || (visitorData._id === idFoundUser) ? null : (
            <div className="ButtonFollow" onClick={followFoundUser} style={{margin:"2rem"}}>
              <TiUserAdd size="1.3rem" color="f4a261"/><h5>Follow</h5>
              
            </div>
          )}
          </div>
        </div>
        <div>
         
        </div>
        <div
          className="greyLine"
          style={{
            height: "1rem",
            backgroundColor: "rgba(33, 33, 33, 0.065)",
            borderTop: "1px solid rgba(33, 33, 33, 0.190)",
            borderBottom: "1px solid rgba(33, 33, 33, 0.190)",
            width:"100%"
          }}
        ></div>

        {!isUserRoad ? <div className="containerRoutineProfil" style={{width: "90%"}}>
          <div className="wrapperRoutine">
            {isFetchingRoutine ? (
              <h2>...is fetching</h2>
            ) : (
              allRoutines.rutinasFoundUser.map((eachRoutine) => {
                return (
                  <Link
                    className="wrapperNameRoutineProfile"
                    key={eachRoutine._id}
                    to={`/routine/${eachRoutine._id}/user`}
                  >
                    <div className="imgBgRoutine">


                    {
                  eachRoutine.category === 'Abbs'? (<img src={eachRoutine.category === 'Abbs'? (abbs):(null)} alt="" className="imgExercise"/>):(null)
                }
                {
                  eachRoutine.category === 'Upper body'? (<img src={eachRoutine.category === 'Upper body'? (upperBody):(null)} alt="" className="imgExercise"/>):(null)
                }
                {
                  eachRoutine.category === 'Lower body'? (<img src={eachRoutine.category === 'Lower body'? (lowerBody):(null)} alt="" className="imgExercise"/>):(null)
                }
                {
                  eachRoutine.category === 'Stretching'? (<img src={eachRoutine.category === 'Stretching'? (stretching):(null)} alt="" className="imgExercise"/>):(null)
                }
                {
                  eachRoutine.category === 'Breathings'? (<img src={eachRoutine.category === 'Breathings'? (breathing):(null)} alt="" className="imgExercise"/>):(null)
                }
                {
                  eachRoutine.category === 'Cardio'? (<img src={eachRoutine.category === 'Cardio'? (cardio):(null)} alt="" className="imgExercise"/>):(null)
                }
                {
                  eachRoutine.category === 'body weight'? (<img src={eachRoutine.category === 'body weight'? (bodyWeight):(null)} alt="" className="imgExercise"/>):(null)
                }



                    </div>
                      <h2>{eachRoutine.name}</h2>

                  </Link>
                );
              })
            )}
          </div>
        </div> : null}
        
        <div className="ajustDiv"></div>
        <AllButtons />
      </div>
    </div>
  );
}

export default ProfileFoundUser;
