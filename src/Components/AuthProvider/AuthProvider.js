import React from 'react'
import { userContext } from '../Hooks/useAuth'
import axios from 'axios';
import {appUrl} from '../../Helpers';

function AuthProvider({children}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [token, setToken] = React.useState('');
    const [loadMessages, setLoadMessages] = React.useState(false);
    const [persist, setPersist] = React.useState(JSON.parse(localStorage.getItem('persist')) || false)
    const [user, setUser] = React.useState({
        username:'',
        email:''
    });

    const [messages, setMessages] = React.useState([]);

    function handlePersist(persist){
        setPersist(persist);
    }

    function handleUser(user){
        setUser(user);
    }

    function handleToken(token){
        setToken(token)
    }

    function handleIsLoading(isLoading){
        setIsLoading(isLoading);
    }

    async function getMessages(){
        try {
            setLoadMessages(true);

            const response = await axios.get(`${appUrl}contact`);
            const {data} = response;
            setMessages(data);
            console.log(data)
            
        } catch (error) {
            console.log(error)
        }finally{
            setLoadMessages(false)
        }
    }
    
    async function getUser(){
        try {
            if(token){
                setIsLoading(true);
                const response = await axios.get(`${appUrl}user`, {
                    headers:{
                        Authorization:'bearer '+token
                    }
                });
        
                const {data}= response;
                console.log(data);
                setUser(data);
                getMessages();
            }else{
                console.log('no token')
            }
          
    
        } catch (error) {
            console.log(error);
        }finally{
            console.log('got user')
            setIsLoading(false);
        }
        
    }

    React.useEffect(()=>{
        getUser();
    }, [token]);

  return (
    <userContext.Provider value={{user, loadMessages, messages, setUser:handleUser, token, setToken:handleToken, isLoading,persist, setPersist:handlePersist, setIsLoading:handleIsLoading}}>
        {children}
    </userContext.Provider>

  )
}

export default AuthProvider;