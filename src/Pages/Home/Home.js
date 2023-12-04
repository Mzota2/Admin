import React from 'react'
import './Home.css';
import Loader from '../../Components/Loader/Loader';
import {useAuth} from '../../Components/Hooks/useAuth';
import { appUrl } from '../../Helpers';
import axios from 'axios';
function Home() {

  const [isLoading ,setIsLoading] = React.useState(true);
  const [home, setHome] = React.useState({
    hello:'',
    description:'',
    profileImage:''
  });

  function handleOnChangeHome(e){
    setHome(prev =>{
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

  function handleOnChangeProfileImage(e){
    setHome(prev =>{
      return{
        ...prev,
        profileImage:e.target.files
      }
    })
  }
  const editHome = async()=>{
    try {
      setIsLoading(true)
    
      const formData = new FormData();
      const fileList = home?.profileImage;

      for (let index = 0; index < fileList.length; index++) {
        const file = fileList[index];
        formData.append('photo', file);
       }

      formData.append('description', home.description);
      formData.append('hello', home.hello);
  
      const response = await axios.put(`${appUrl}home/${home?._id}`, formData, {
        headers:{
          Accept:"application/json",
          "Content-Type":"multipart/form-data"
      }
      });

      const {data} = response;
      console.log(data);
      
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false);
    }
  };

  const getHome = async()=>{
    try {
      const response = await axios.get(`${appUrl}home`);
      const {data} = response;
      setHome(data[0]);
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }

  };

  React.useEffect(()=>{
    getHome();
  }, []);
  return (
    <div className='section'>
       <Loader hide={!isLoading?'hide-loader':''}/>
      <div className='container content-container'>
        <form className='section-form'>
          <div className="row">
            <div className="col">
              <input name='hello' value={home.hello} onChange={handleOnChangeHome} type="text" placeholder='Enter hero text' className='section-form-input' />
            </div>
            <div className="col">
              <textarea  name="description" value={home.description} onChange={handleOnChangeHome} id="" cols="30" rows="10" className='section-form-input' placeholder='Enter description text' ></textarea>
            </div>
          </div>

          <div className="col">
            <label htmlFor="photo">Profile Image</label><br />
            {home?.profileImage && <p>{typeof(home?.profileImage) !== 'string'?'':home?.profileImage.slice(21)}</p>}
            <br />
            
            <input type="file" id='photo' name='photo' onChange={handleOnChangeProfileImage} className='section-form-input'/>
          </div>

          <div className="section-button-container">
            <button onClick={editHome} type='button' className='section-btn edit-btn'>Edit</button>
            <button type='button' className='section-btn del-btn'>Delete</button>
          </div>
        </form>
      </div>
    </div>
    
  )
}

export default Home