import { createContext, useState, useEffect } from "react";
import SearchingSpinner from "../components/SearchingSpinner";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext ()

function AuthWrapper (props) {
    
    //Nuestros estados de autententificacion
    const [ isLoggedIn, setIsLoggedIn] = useState(false)
    const [ loggedUser, setLoggedUser ] = useState(null)
    const [ isFetching, setIsFetching ] = useState(true)
    //Nuestras funciones de autentificacione

    //Esta funcion que va a contactar al backend para validar el token
    const authenticateUser = async () => {
        setIsFetching(true)
        
        try {
            
           const response = await verifyService()
           console.log(response)
           console.log("Token es Valido")
           setIsLoggedIn(true)
           setLoggedUser(response.data)       
           setIsFetching(false)
        } catch (error) {
           console.log("Token invalido o no existe")
           console.log(error)
           setIsLoggedIn(false)
           setLoggedUser(null)
           setIsFetching(false)
        }
    }
    
    useEffect(() => {
        authenticateUser() // autentifica el token del usuario cuando visita o refresca la pagina.
    }, []) 

    const passedContext = {
        isLoggedIn,
        loggedUser,
        authenticateUser
    }

    
    if(isFetching === true){
        return (
            <div className="App">
                <SearchingSpinner/>
            </div>
        )
    }

    return(
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )

}

export {
    AuthContext,
    AuthWrapper
}