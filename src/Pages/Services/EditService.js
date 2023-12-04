import React from 'react'

function EditService({displayEditServices, setDisplayEditServices, service,handleOnChangeService, editService}) {

    function handleDisplayEditServices(){
        setDisplayEditServices(!displayEditServices);
    }
    
  return (
    <div className="section-overlay">
        <div onMouseLeave={handleDisplayEditServices} className='container add-container'>
            <form className='section-form'>
            <div className="row">
                <div className="col">
                <input name='serviceTitle' value={service.serviceTitle} onChange={handleOnChangeService} type="text" placeholder='Enter service name' className='section-form-input' />
                </div>
                <div className="col">
                <textarea name='serviceDescription' value={service.serviceDescription} onChange={handleOnChangeService} id="" cols="30" rows="10" className='section-form-input' placeholder='Enter description text' ></textarea>
                </div>
            </div>

            <button onClick={()=> {editService(service._id); handleDisplayEditServices();}} className='create-btn section-btn add-btn'>Submit</button>

            </form>
        </div>
    </div>
  )
}

export default EditService