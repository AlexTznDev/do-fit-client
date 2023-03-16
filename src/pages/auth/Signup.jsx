import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupSerivce } from "../../services/auth.services";

import imgBG from "../../image/signUp.jpg";
import logoWhite from "../../logo/logoDofitblanc.png";

function Signup() {
  //Navigate para ir a login despues de crear el usuario
  const navigate = useNavigate();

  //Creacion de estados para la aceptacion de email y password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //Funciones para cambiar el valor de los estados de email y password

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    //creando nuevo usuario
    const newUser = {
      email: email,
      password: password,
    };

    try {
      const response = await signupSerivce(newUser);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data.errorMessage);
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  return (
    <div className="mainContainer justify">
      <div className="containerLogohome">
        <img src={logoWhite} alt="logo" />
      </div>
      <div
        style={{
          width: "100vw",
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
            />
            <br />
            <label style={{ color: "#fff" }}></label>
            <input
              onChange={handlePasswordChange}
              type="text"
              name="password"
              value={password}
              placeholder="Password"
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
