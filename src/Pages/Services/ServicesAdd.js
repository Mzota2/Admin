import React from 'react'
import axios from 'axios';
import { appUrl } from '../../Helpers';
import Loader from '../../Components/Loader/Loader';

function ServicesAdd({setDisplayAddServices, displayAddServices, getServices}) {

    const [isLoading, setIsLoading] = React.useState(false);

    const [service, setService] = React.useState({
        serviceTitle:'',
        serviceDescription:''
    });

    function handleOnChangeService(e){
        setService(prev =>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    const addService = async()=>{
        try {
            setIsLoading(true);
            const response = await axios.post(`${appUrl}service`, service);
            const {data} = response;
            console.log(data);
            getServices()
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    function handleDisplayAddServices(){
        setDisplayAddServices(!displayAddServices);
    }
    
  return (
    <div className="section-overlay">
        <Loader hide={!isLoading?'hide-loader':''}/>
        <div onMouseLeave={handleDisplayAddServices} className='container add-container'>
            <form className='section-form'>
            <div className="row">
                <div className="col">
                    <input name='serviceTitle' value={service.serviceTitle} onChange={handleOnChangeService} type="text" placeholder='Enter service' className='section-form-input' />
                </div>
                <div className="col">
                    <textarea name="serviceDescription" value={service.serviceDescription} onChange={handleOnChangeService} id="" cols="30" rows="10" className='section-form-input' placeholder='Enter description text' ></textarea>
                </div>
            </div>

            <button type='button' onClick={addService} className='create-btn section-btn add-btn'>Submit</button>

            </form>
        </div>
    </div>
  )
}

export default ServicesAdd