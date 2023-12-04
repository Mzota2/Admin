import React from 'react'
import ServicesAdd from './ServicesAdd';
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';
import { appUrl } from '../../Helpers';
import EditService from './EditService';

function Services() {
  const [isLoading ,setIsLoading] = React.useState(true);
  const [services, setServices] = React.useState([{
    serviceTitle:'',
    serviceDescription:''
  }]);

  const [displayAddServices, setDisplayAddServices] = React.useState(false);
  function handleDisplayAddServices(id){
    setDisplayAddServices(!displayAddServices);
    if(services){
      const foundService = services.find((skill)=> skill._id === id);
      setService(foundService);
    }
  }

  const [service, setService] = React.useState({
    serviceTitle:'',
    serviceDescription:''
  })


  const [displayEditServices, setDisplayEditServices] = React.useState(false);

  function handleDisplayEditServices(id){
    setDisplayEditServices(!displayEditServices);
    if(services){
      const foundService = services.find((skill)=> skill._id === id);
      setService(foundService);
    }
  }


  function handleOnChangeService(e){
    setService(prev =>{
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

  const editService = async(id)=>{
    try {
      setIsLoading(true)
    
      const response = await axios.put(`${appUrl}service/${id}`, service, {
        headers:{
          Accept:"application/json",
      }
      });
      const {data} = response;
      console.log(data);
      setService(data)
      getServices();
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false);
    }
  };

  const deleteService = async(id)=>{
    try {
      setIsLoading(true);

      const response = await axios.delete(`${appUrl}service/${id}`);
      const {data} = response;
      console.log(data)
      getServices();
      
    } catch (error) {
      console.log(error);

    }finally{
      setIsLoading(false)
    }
  }

  const getServices = async()=>{
    try {
      const response = await axios.get(`${appUrl}service`);
      const {data} = response;
      console.log(data);
      setServices(data);
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }

  };

  React.useEffect(()=>{
    getServices();
  }, []);



  return (
    <div className='section'>
      <Loader hide={!isLoading?'hide-loader':''}/>
    <div className='container content-container'>
      {
        services?.map((service)=>{
          const {serviceTitle, serviceDescription} = service
          return(
            <form key={serviceTitle} className='section-form'>
              <div className="row">
                <div className="col">
                  <input disabled name='serviceTitle' value={serviceTitle} onChange={handleOnChangeService} type="text" placeholder='Enter service' className='section-form-input' />
                </div>
                <div className="col">
                  <textarea disabled name='serviceDescription' value={serviceDescription} onChange={handleOnChangeService} id="" cols="30" rows="10" className='section-form-input' placeholder='Enter description text' ></textarea>
                </div>
              </div>

              <div className="section-button-container">
                <button onClick={()=>{handleDisplayEditServices(service._id)}} type='button' className='section-btn edit-btn'>Edit</button>
                <button onClick={()=>{deleteService(service._id)}} type='button' className='section-btn del-btn'>Delete</button>
              </div>
            </form>
          )
        })
      }
      

      <button onClick={handleDisplayAddServices} type='button' className="section-btn add-btn">Add</button>
    </div>

    {displayAddServices?<ServicesAdd getServices={getServices} setDisplayAddServices={setDisplayAddServices} displayAddServices={displayAddServices}/>:<></>}
    {displayEditServices?<EditService editService={editService} handleOnChangeService={handleOnChangeService} service={service} setDisplayEditServices={setDisplayEditServices} displayEditServices={displayEditServices}/>:<></>}
  
  </div>
  )
}

export default Services