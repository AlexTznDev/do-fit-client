import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupSerivce } from "../../services/auth.services";

import imgBG from "../../image/signUp.jpg";
import logoWhite from "../../logo/logoDofitblanc.png";

function Signup() {
  
  const navigate = useNavigate();

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };

    try {
      await signupSerivce(newUser);
      navigate("/login");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className="mainContainer justify">
      <div className="containerLogohome">
        <img src={logoWhite} alt="logo" />
      </div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          zIndex: "-1",
        }}
      >
        <img

          src={imgBG}
          alt="bachGDimgForm"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="ContainerForm">
          <form onSubmit={handleSignUp}>
            <h1 style={{ color: "#fff" }}>Sing Up</h1>
            <br />
            <br />
            <div></div>

            <label style={{ color: "#fff" }}></label>
            <input
              onChange={handleEmailChange}
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              style={{ width: "15rem" }}
            />
            
            <label style={{ color: "#fff" }}></label>
            <input
              onChange={handlePasswordChange}
              type="text"
              name="password"
              value={password}
              placeholder="Password"
              style={{ width: "15rem" }}
            />
            <br />
            <button type="submit">SignUp</button>
            {errorMessage !== "" ? <p>{errorMessage}</p> : null}
          </form>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent:"center",
            gap: "2rem",
            position:"fixed",
            bottom:"5rem",
            left:"50%",
            transform: "translateX(-50%)",
          }}
        >
          <Link 
          style={{
            padding:".5rem 2rem",
            backgroundColor:"#fff",
            borderRadius:"40px"
          }}
          to="/">Home</Link>
          <Link 
           style={{
            padding:".5rem 2rem",
            backgroundColor:"#fff",
            borderRadius:"40px"
          }}
          to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
