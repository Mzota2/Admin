import React from 'react'
import Loader from '../../Components/Loader/Loader';
import { appUrl } from '../../Helpers';
import axios from 'axios';

function Contact() {
  const [isLoading ,setIsLoading] = React.useState(true);
  const [contact, setContact] = React.useState({
    contactPhone:'',
    contactEmail:'',
    contactLocation:''
  });

  function handleOnChangeContact(e){
    setContact(prev =>{
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

  const editContact = async()=>{
    try {
      setIsLoading(true)
    
      const response = await axios.put(`${appUrl}contactInfo/${contact?._id}`, contact, {
        headers:{
          Accept:"application/json",
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

  const getContact = async()=>{
    try {
      const response = await axios.get(`${appUrl}contactInfo`);
      const {data} = response;
      setContact(data[0]);
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }

  };

  React.useEffect(()=>{
    getContact();
  }, []);

  return (
    <div className='section'>
       <Loader hide={!isLoading?'hide-loader':''}/>
    <div className='container content-container'>
      <form className='section-form'>
        <div className="row">
          <div className="col">
            <input value={contact.contactLocation} onChange={handleOnChangeContact} name='contactLocation' type="text" placeholder='Enter location' className='section-form-input' />
          </div>
          <div className="col">
            <input name='contactEmail' value={contact.contactEmail} onChange={handleOnChangeContact} type="email" placeholder='Enter email' className='section-form-input' />
          </div>
        </div>

        <div className="col">
          <input name='contactPhone' value={contact.contactPhone} onChange={handleOnChangeContact} type="Number" placeholder='Enter phone number' className='section-form-input'/>
        </div>

        <div className="button-container">
          <button onClick={editContact} type='button' className='section-btn edit-btn'>Edit</button>
          <button type='button' className='section-btn del-btn'>Delete</button>
        </div>
      </form>
    </div>

  </div>
  )
}

export default Contact