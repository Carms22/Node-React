import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, userLogin } from "../services/AuthServices";
import { getAccessToken, setToken, logout } from "../store/AccessTokenStore";
import  verifyJWT  from '../helper/jwtHelper.js'


//createContext() creates an empty context object that will be used to share the authentication state 
//and functions between components.
const AuthContext = createContext();//para crear un provider, componente q engloba a otros

const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be use within an AuthProvider')
    }
    return context;
}//hook que hace uso del contexto

//Provides que engloba a otros, lo que permite pasarle a los hijos 
//la información contenida en la propiedad value={}
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();//usuario q va a poder ser leido en toda la aplicación
    console.log('antes de pasar por isAuthenticated');

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const getUser = () => {
        getCurrentUser()
          .then(user => {
            console.log(`entro en getUser use--> ${user}`);
            setUser(user)
            setIsAuthenticated(true)
            // cb && cb() Callback por si queremos hacer algo justo al traernos el usuario
          })
      }

    const login = async () => {

        console.log(`entro en login token-->$`);
        try {
            console.log(`entro en login try`);
            const data = await userLogin()
            console.log(`data del userLogin ${data}`);
            const tokenSet = await setToken()
            console.log(tokenSet);
            const userFound = await getUser()
                console.log("User in login",userFound)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (getAccessToken()) {
            console.log(getAccessToken());
          if (!verifyJWT(getAccessToken())) {
            logout()
              .then( ()=> console.log("Logout"))
          } else {
            getUser()
          }
        } else {
            setIsAuthenticated(true)
        }
      }, [])
  
    //devolvemos la constante del "createProvider".Provider con la propiedad value={} que será un objeto con todo
    // lo que queremos exportar
    return(
        <AuthContext.Provider 
            value={{
                login,
                user,
                isAuthenticated,
                setIsAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, useAuth};
export default AuthContext;