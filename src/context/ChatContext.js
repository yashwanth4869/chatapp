import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase'
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext()


export const ChatContextProvider = ({children}) =>{
    const {curruser} = useContext(AuthContext)
    const INITIAL_STATE = {
        chatid:"null",
        user:{}
    }

    const chatreducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatid : curruser.uid > action.payload.uid ? curruser.uid + action.payload.uid : action.payload.uid + curruser.uid
                };default:
                    return state;
        }
    }

    const [state,dispatch] = useReducer(chatreducer,INITIAL_STATE);

    return(    
        <ChatContext.Provider value = {{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}