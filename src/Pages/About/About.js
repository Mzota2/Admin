import React from 'react'
import Loader from '../../Components/Loader/Loader';
import {useAuth} from '../../Components/Hooks/useAuth';
import axios from 'axios';
import { appUrl } from '../../Helpers';

function About() {

  const [isLoading ,setIsLoading] = React.useState(true);
  const [about, setAbout] = React.useState({
    description:'',
    resume:''
  });

  function handleOnChangeDescription(e){
    setAbout(prev =>{
      return{
        ...prev,
        description:e.target.value || e.target.files
      }
    })
  };

  function handleOnChangeResume(e){
    setAbout(prev =>{
      return{
        ...prev,
        resume:e.target.files
      }
    })
  };

  const editAbout = async()=>{
    try {
      setIsLoading(true)
      const formData = new FormData();
      const fileList = about?.resume;

      for (let index = 0; index < fileList.length; index++) {
        const file = fileList[index];
        formData.append('photo', file);
       }

      formData.append('description', about.description);
  
      const response = await axios.put(`${appUrl}about/${about?._id}`, formData, {
        headers:{
          Accept:"application/json",
          "Content-Type":"multipart/form-data"
      }
      });

      const {data} = response;
      
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false);
    }
  };

  const getAbout = async()=>{
    try {
      const response = await axios.get(`${appUrl}about`);
      const {data} = response;
      setAbout(data[0]);
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }

  };

  React.useEffect(()=>{
    getAbout();
  }, []);

  return (
    <div className='section'>
      <Loader hide={!isLoading?'hide-loader':''}/>
    <div className='container content-container'>
      <form className='section-form'>
       
        <div className="col">
        <textarea value={about?.description} onChange={handleOnChangeDescription} name="description" id="" cols="30" rows="10" className='section-form-input' placeholder='Enter description text' ></textarea>
        </div>
        
        <div className="col">
          <label htmlFor="resume"style={{display:'block'}}>Resume</label> <br />
          {about?.resume && <p>{typeof(about?.resume) !== 'string'?'':about?.resume.slice(21)}</p>}
          <br />
          <input name='photo' onChange={handleOnChangeResume} type="file"  id='resume' style={{display:'block'}}/>
        </div>

        <div className="col">
          
        </div>

        <div className="button-container">
          <button onClick={editAbout} type='button' className='section-btn edit-btn'>Edit</button>
          <button type='button' className='section-btn del-btn'>Delete</button>
        </div>

      </form>
    </div>
  </div>
  )
}

export default About