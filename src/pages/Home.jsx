import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", paddingTop:"2rem"}}>



    <div className={"containerBtnHome"}>
      <NavLink to="/signup" className={"ButtonHome"}>
      Sign Up
      </NavLink>

      <NavLink to="/login" className={"ButtonHome"}>
       Log In
      </NavLink>

      <NavLink to="/search" className={"ButtonHome"}>
       Search friends
      </NavLink>

    </div>

    </div>
  );
}

export default Home;
