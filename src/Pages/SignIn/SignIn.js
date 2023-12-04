import React from 'react'
import './SignIn.css';
import {Formik} from 'formik';
import axios from 'axios';
import { appUrl } from '../../Helpers';
import {Schema} from '../../Components/Schema/Schema'
import { useAuth } from '../../Components/Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [admin, setAdmin] = React.useState({
    email:'',
    password:''
  });

  const navigate = useNavigate();

  const {setToken, persist, setPersist} = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);

  function togglePassword(e){
    setShowPassword(!showPassword);
  
  }

  function handleOnChangePersist(e){
    setPersist(prev => !prev);
    console.log(persist);
  }
  async function adminLogin(values){
    try {

      const response = await axios.post(`${appUrl}user/signin`, values, {
        withCredentials:true
      });

      const data = await response.data;
      console.log(data)
      setToken(data);
      navigate('/home');
      
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(values, {resetForm}){
    adminLogin(values);
    console.log(values)
    resetForm();
  }

  React.useEffect(()=>{
    localStorage.setItem('persist', persist);
  }, [persist])
  return (
    <div className='sign-form'>

      <Formik
        validationSchema={Schema}
        initialValues={admin}
        onSubmit={handleSubmit}
      
      >{({errors, touched,values, handleSubmit, handleChange })=>(
        <form noValidate onSubmit={handleSubmit} className='sign-form-container container'>
          <h1>Sign In</h1>
          
          <div className='input-label'>
            <label htmlFor="email">Email</label>
            <input value={values.email} onChange={handleChange} type="email" id='email' />
            {touched.email && errors.email && <p className='error-text'>{errors.email}</p>}
          </div>
          
          <div className='input-label'>
            <label htmlFor="password">Password</label>
            <div className='pwd-container'>
              <i onClick={togglePassword} className={`fas fa-eye${showPassword?'-slash':''} pwd-icon`}></i>
              <input type={`${showPassword?'text':'password'}`} id='password' value={values.password} onChange={handleChange} />
            </div>
            
            {touched.password && errors.password && <p  className='error-text'>{errors.password}</p>}

            <div className="input-label">
              <label htmlFor="persist">Trust this device</label>
              <input type="checkbox" id='persist' checked={persist} onChange={handleOnChangePersist}/>
            </div>
          </div>

          <button type='submit' className='signin-btn admin-btn'>Sign in</button>
        
        </form>
      )}


      </Formik>

      
      <div className='sign-in-overlay'></div>
    </div>
  )
}

export default SignIn