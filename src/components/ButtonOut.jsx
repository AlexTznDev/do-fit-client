import { BiLogOutCircle } from "react-icons/bi";


function ButtonOut({handleLogout}) {
  return (
    <div>
    <button className="buttonOut" onClick={handleLogout}>
      <BiLogOutCircle  size="1.7rem" color="rgba(33, 33, 33, 0.853)"/>
    </button>
  </div>
  )
}

export default ButtonOut
