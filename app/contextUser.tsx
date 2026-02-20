import { createContext, useContext, useState } from "react";

type ContainerProps = {
    children : React.ReactNode;
}

interface Usuario {
    id_usuario : number,
    nombre : string,
    email : string,
    password : string
}

type TypeExContentType = {
   user : Usuario | null,
   setUser : React.Dispatch<React.SetStateAction<Usuario | null>>
}

const typeExContextState = {
    user : null,
    setUser : () => null
}

const UserContext = createContext<TypeExContentType>(typeExContextState)

const UserProvider = (props : ContainerProps) => {

    const[user,setUser] = useState<Usuario | null>(null);

     return(
        <UserContext.Provider value = {{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext);

export {UserProvider,useUser}