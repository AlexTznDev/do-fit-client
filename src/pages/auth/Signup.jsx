import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  //Navigate para ir a login despues de crear el usuario
  const navigate = useNavigate();

  //Creacion de estados para la aceptacion de email y password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("")

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
      const response = await axios.post(
        "http://localhost:5005/api/auth/signup",
        newUser
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data.errorMessage);
      setErrorMessage(error.response.data.errorMessage)
    }
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Sing Up</h1>

      <form onSubmit={handleSignUp}>
        <label>Email: </label>
        <input
          onChange={handleEmailChange}
          type="email"
          name="email"
          value={email}
        />
        <br />
        <label>Password: </label>
        <input
          onChange={handlePasswordChange}
          type="text"
          name="password"
          value={password}
        />
        <br />
        <button type="submit">SignUp</button>
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}

export default Signup;
