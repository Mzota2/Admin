import React from 'react'
import { useAuth } from './Components/Hooks/useAuth';
import { appUrl } from './Helpers';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Loader from './Components/Loader/Loader';

function PersistLogin() {
    const [isLoading, setIsLoading] = React.useState(false);
    const {token, setToken, persist} = useAuth();

    async function refreshToken(){
        try {
            setIsLoading(true)
            
            const response = await axios.get(`${appUrl}user/refresh`, {
                withCredentials:true
            });

            const {data} = response;
            setToken(data);
            
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
            console.log('token refreshed or not');
        }
    }

    React.useEffect(()=>{
        
        token?
            setIsLoading(false):
        persist?
            refreshToken():
            setIsLoading(false);


        console.log(persist)
    },[]);

  return (
    <div>
        {
            isLoading?
                <Loader hide={''} />:
                <Outlet/>}
    </div>
  )
}

export default PersistLogin