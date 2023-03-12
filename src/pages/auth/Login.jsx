import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { loginService } from "../../services/auth.services";

function Login() {
// añadiendo el authcontext

  const {authenticateUser} = useContext(AuthContext)


  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [ errorMessage, setErrorMessage ] = useState("")

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
     const response =  await loginService(userAccount)
     console.log(response)
    
      authenticateUser()
      console.log("usuario autentificado")
     //6. Haciendo uso del LocalStorage para almacenar el token que viene del BE
     localStorage.setItem("authToken", response.data.authToken) 
      navigate("/profile")

    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.errorMessage)
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
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}

export default Login;
