import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase'
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [curruser,setcurruser] = useState({})

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            console.log(user)
            setcurruser(user);
        });

        return () =>{
            unsub();
        }
    },[]);

    return(    
        <AuthContext.Provider value = {{curruser}}>
            {children}
        </AuthContext.Provider>
    )
}