import React from 'react'
import './NavBar.css';
import Tab from '../Tab/Tab';
import Profile from '../Profile/Profile';
import { IoMdNotificationsOutline } from "react-icons/io";
import { useAuth } from '../Hooks/useAuth';
import { appUrl } from '../../Helpers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

function NavBar() {
  const [showSettings, setShowSettings] = React.useState(false);
  const navigate = useNavigate();


  const {user, token, setToken, isLoading} = useAuth();


  async function signOut(){

    try {
      const response  =  await axios.get(`${appUrl}user/signout`, {
        withCredentials:true
      });
  
      const {data} = response;
      setToken(undefined);
      console.log(data);
      navigate('/');

      
    } catch (error) {
      console.log(error);
    }
    
  }

  function handleShowSettings(e){
    setShowSettings(true);
  }

  function closeOpenMenu(){
    setShowSettings(false);
  }

  React.useEffect(()=>{
    
    document.addEventListener('mousedown', closeOpenMenu);

    return ()=>{
      document.removeEventListener('mousedown', closeOpenMenu)
    }

  }, [])
 

  return (
    <header>
      <Loader hide={!isLoading?'hide-loader':''}/>
        <nav className="container nav-container">
          <div className='nav-top'>
            <h2>Admin Panel</h2>

            <div className="nav-bottom nav-bottom-desktop">
            <Tab/>
            </div>
              <div className='nav-right '>
                <div onClick={()=>{navigate('/messages')}} className="notification-container">
                  <p className='message-count'>5</p>
                  <IoMdNotificationsOutline className='nav-icon'></IoMdNotificationsOutline>
                </div>
                
                <Profile handleShowSettings={handleShowSettings}/>
              </div>
          </div>
          
          <div className="nav-bottom nav-bottom-mobile">
            <Tab/>
          </div>
        
            
        </nav>

        {showSettings?<div className='settings-container'>
          <p style={{color:'black'}}>{user?.username}</p>
          <button onClick={signOut} className='section-btn logout-btn'>Log out</button>
          <button className='section-btn del-acc-btn'>Delete account</button>
        </div>:<></>}
       
    </header>
  )
}

export default NavBar