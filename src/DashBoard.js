import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth} from './Components/Hooks/useAuth'

function DashBoard() {
  const {token, isLoading}  = useAuth();
  const location = useLocation();

  return (
    token?
    <div>
        <NavBar/>
        <Outlet/>
    </div>:<Navigate to={'/'} state={{from:location}} replace />
  )
}

export default DashBoard