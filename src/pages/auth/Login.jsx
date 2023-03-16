import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { loginService } from "../../services/auth.services";

import logoWhite from "../../logo/logoDofitblanc.png";
import imgBG from "../../image/signUp.jpg";

function Login() {
  // añadiendo el authcontext

  const { authenticateUser } = useContext(AuthContext);

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

  const handleLogin = async (event) => {
    event.preventDefault();

    const userAccount = {
      email: email,
      password: password,
    };

    try {
      const response = await loginService(userAccount);
      console.log(response);

      authenticateUser();
      console.log("usuario autentificado");
      //6. Haciendo uso del LocalStorage para almacenar el token que viene del BE
      localStorage.setItem("authToken", response.data.authToken);
      navigate("/profile");
    } catch (error) {
      console.log(error);
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
          <form onSubmit={handleLogin}>
            <h1 style={{ color: "#fff" }}>Log In</h1>
            <br /><br />
            <label></label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              style={{ width: "15rem" }}
            />
           
            <label></label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              style={{ width: "15rem" }}
            />
            <br />

            <button type="submit">Login</button>
            {errorMessage !== "" ? <p>{errorMessage}</p> : null}
          </form>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            position: "fixed",
            bottom: "5rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Link
            style={{
              padding: ".5rem 2rem",
              backgroundColor: "#fff",
              borderRadius: "40px",
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
            }}
            to="/"
          >
            Home
          </Link>
          <Link
            style={{
              padding: ".5rem 2rem",
              backgroundColor: "#fff",
              borderRadius: "40px",
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
            }}
            to="/signup"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
