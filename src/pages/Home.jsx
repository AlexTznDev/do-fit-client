import { useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import videoBg from "../video/videoHome.mp4";
import logoWhite from "../logo/logoDofitblanc.png";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === true) {
    return <Navigate to="/profile" />;
  } else {
    return (
      <div>


      <div className="containerLogohome">
      <img
          src={logoWhite}
          alt="logo" 
        />
      </div>

        <div className="video-container">
          <video src={videoBg} autoPlay loop></video>
        </div>

        <div className="filterHome">
          <div className="wrapperHome">
            <h2
              className="fontLarge"
              style={{ color: "#fff", paddingLeft: "1rem", margin: "0" }}
            >
              Do Fit Training Club
            </h2>

            <h3
              style={{ padding: "0 1rem", margin: "0" }}
              className="greyTransparent fontLarge"
            >
              All you need to achieve your fitness goals. Let's go
            </h3>
          </div>

          <div className={"containerBtnHome"}>
            <NavLink to="/signup" className={"ButtonHome"}>
              Sign Up
            </NavLink>

            <NavLink to="/login" className={"ButtonHome"}>
              Log In
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
