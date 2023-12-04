import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Routes from './Routes';
import { appUrl } from './Helpers';
import AuthProvider from './Components/AuthProvider/AuthProvider';
function App() {

  return (
    <BrowserRouter>
        <AuthProvider>
          <div className="App">
            <Routes/>
          </div>
        </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
