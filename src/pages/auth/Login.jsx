import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate()


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      await axios.post("http://localhost:5005/api/auth/login",userAccount);
      navigate("/profile")

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/">Home</Link>

      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label>Password:</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
