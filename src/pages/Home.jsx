import React from "react";
import { NavLink } from "react-router-dom";
import videoBg from "../video/videoHome.mp4"

function Home() {
  return (
    <div>
      <div class="video-container">
        <video src={videoBg} autoPlay loop></video>
      </div>


<div className="filterHome">

<h2 style={{color:"#fff" , paddingLeft:"1rem", margin:"0"}}>Do Fit Training Club</h2>
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

export default Home;
