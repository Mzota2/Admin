import {React, useState, useEffect, useRef} from 'react'
import './Tab.css';
import { Link } from 'react-router-dom';

function Tab() {
  const [isActive, setIsActive] = useState('Home');
  
  function handleTab(e){
    setIsActive(e.target.innerText);
  }

  useEffect(()=>{
  }, []);

  return (
    <div className='tab-container'>
        <Link state={''} onClick={handleTab} to={'/home'} className={`tab ${isActive == 'Home'?'active-tab':''}`}>Home</Link>
        <Link onClick={handleTab} to={'/about'} className={`tab ${isActive == 'About'?'active-tab':''}`}>About</Link>
        <Link onClick={handleTab} to={'/skills'} className={`tab ${isActive == 'Skills'?'active-tab':''}`}>Skills</Link>
        <Link onClick={handleTab} to={'/projects'} className={`tab ${isActive == 'Projects'?'active-tab':''}`}>Projects</Link>
        <Link onClick={handleTab} to={'/services'} className={`tab ${isActive == 'Services'?'active-tab':''}`}>Services</Link>
        <Link onClick={handleTab} to={'/contact'} className={`tab ${isActive == 'Contact'?'active-tab':''}`}>Contact</Link>
    </div>
  )
}

export default Tab