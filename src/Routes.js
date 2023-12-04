import React from 'react'
import {Navigate, Route, Routes as Routez, useLocation} from 'react-router-dom';
import SignIn from './Pages/SignIn/SignIn';
import Skills from './Pages/Skills/Skills';
import About from './Pages/About/About';
import Services from './Pages/Services/Services';
import Projects from './Pages/Projects/Projects';
import Contact from './Pages/Contact/Contact';
import Home from './Pages/Home/Home';
import DashBoard from './DashBoard';
import Messages from './Components/Messages/Messages'
import { useAuth } from './Components/Hooks/useAuth';
import PersistLogin from './PersistLogin';
function Routes() {
  const {token} = useAuth();
  const location = useLocation();
  const tof = location.state?.from?.pathname;
  console.log(tof);
  return (
    <Routez>
        <Route path='/' element={token?<Navigate to={tof || '/home'} state={{from:location}} replace/>:<SignIn/>}/>

        <Route path='/' element={<PersistLogin/>} >

          <Route element={<DashBoard/>} >
            <Route path ='/home' element={<Home></Home>}/>
            <Route path ='/messages' element={<Messages></Messages>}/>
            <Route path ='/about' element={<About></About>}/>
            <Route path ='/skills' element={<Skills></Skills>}/>
            <Route path ='/projects' element={<Projects></Projects>}/>
            <Route path ='/services' element={<Services></Services>}/>
            <Route path ='/contact' element={<Contact></Contact>}/>
          </Route>

        </Route>
        
        
    </Routez>
  )
}

export default Routes