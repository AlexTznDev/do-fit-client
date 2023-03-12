import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function IsPrivate(props) {
 
const { isLoggedIn } = useContext(AuthContext)


if(isLoggedIn === true){
    //solo renbderiza el compoenente envuelto si el usuario esta activo
    return props.children
 } else {
    //EL sistema no me permitira hacer navigate con useNavigate en la base del componente
    return <Navigate to="/login"/>
}

}

export default IsPrivate