import React from 'react'
import axios from 'axios';
import { appUrl } from '../../Helpers';
import Loader from '../../Components/Loader/Loader';
function SkillsAdd({displayAddSkills, setDisplayAddSkills, getSkills}) {
    const [isLoading, setIsLoading] = React.useState(false);

    const [skill, setSkill] = React.useState({
        skillTitle:'',
        skillRating:0
    });

    function handleOnChangeSkill(e){
        setSkill(prev =>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    const addSkill = async()=>{
        try {
            setIsLoading(true)
            const response = await axios.post(`${appUrl}skill`, skill);
            const {data} = response;
            console.log(data);

            getSkills();
            
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    function handleDisplayAddSkills(){
        setDisplayAddSkills(!displayAddSkills);
    }
    
  return (
    <div className="section-overlay">
        <Loader hide={!isLoading?'hide-loader':''}/>
        <div onMouseLeave={handleDisplayAddSkills} className='container add-container'>
            <form className='section-form'>
            <div className="row">
                <div className="col">
                <input name='skillTitle' value={skill.skillTitle} onChange={handleOnChangeSkill} type="text" placeholder='Enter skill name' className='section-form-input' />
                </div>
                <div className="col">
                    <input name='skillRating' value={skill.skillRating} onChange={handleOnChangeSkill} type="Number" placeholder='Enter skill rating' className='section-form-input' />
                </div>
            </div>

            <button type='button' onClick={addSkill} className='create-btn section-btn add-btn'>Submit</button>

            </form>
        </div>
    </div>
  )
}

export default SkillsAdd