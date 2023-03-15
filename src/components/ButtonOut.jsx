import { BiLogOutCircle } from "react-icons/bi";


function ButtonOut({handleLogout}) {
  return (
    <div>
    <button className="buttonOut" onClick={handleLogout}>
      <BiLogOutCircle  size="1.7rem" color="f4a261"/>
    </button>
  </div>
  )
}

export default ButtonOut
