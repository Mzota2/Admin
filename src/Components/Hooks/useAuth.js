import { createContext, useContext } from "react";

export const userContext = createContext({
    messages:[],
    token:'',
    user:{},
    persist:false,
    loadMessages:false,
    isLoading:true,
    setPersist:()=>{},
    setIsLoading:()=>{},
    setUser:()=>{},
    setToken:()=>{},
});

export function useAuth (){
    return useContext(userContext);
}