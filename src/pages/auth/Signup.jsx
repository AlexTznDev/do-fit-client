import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Signup() {

  //Creacion de estados para la aceptacion de email y password
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  //Funciones para cambiar el valor de los estados de email y password

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSignUp = async (event) => {
    event.preventDefault();

    //creando nuevo usuario
    const newUser = {
      email: email,
      passowrd: password
    }

    try {

      await axios.post("http://localhost:5005/apiauth/signup", newUser)
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Sing Up</h1>

      <form onSubmit={handleSignUp}>
        <label>Email: </label>
        <input onChange={handleEmailChange} type="email" name="email" value={email}/>
        <br />
        <label>Password: </label>
        <input onChange={handlePasswordChange} type="text" name="password" value={password}/>
        <br />
        <button type="submit">SignUp</button>
      </form>
      
    </div>
  )
}

export default Signup
