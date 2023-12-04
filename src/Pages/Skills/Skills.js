import React from 'react'
import SkillsAdd from './SkillsAdd';
import Loader from '../../Components/Loader/Loader';
import {useAuth} from '../../Components/Hooks/useAuth';
import { appUrl } from '../../Helpers';
import axios from 'axios';
import EditSkill from './EditSkills';

function Skills() {
  const [skill, setSkill] = React.useState({
    skillTitle:'',
    skillRating:0
  })

  const [displayAddSkills, setDisplayAddSkills] = React.useState(false);
  function handleDisplayAddSkills(){
    setDisplayAddSkills(!displayAddSkills);
  }

  const [displayEditSkills, setDisplayEditSkills] = React.useState(false);

  function handleDisplayEditSkills(id){
    setDisplayEditSkills(!displayEditSkills);
    if(skills){
      const foundSkill = skills.find((skill)=> skill._id === id);
      setSkill(foundSkill);
    }
  }

  const [isLoading ,setIsLoading] = React.useState(true);
  const [skills, setSkills] = React.useState([{
    skillTitle:'',
    skillRating:0
  }]);



  function handleOnChangeSkill(e){
    setSkill(prev =>{
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

  const editSkill = async(id)=>{
    try {
      setIsLoading(true)
    
      const response = await axios.put(`${appUrl}skill/${id}`, skill, {
        headers:{
          Accept:"application/json",
      }
      });
      const {data} = response;
      console.log(data);
      setSkill(data)

      getSkills();
      
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false);
    }
  };

  const deleteSkill = async(id)=>{
    try {
      setIsLoading(true);

      const response = await axios.delete(`${appUrl}skill/${id}`);
      const {data} = response;
      console.log(data)
      getSkills();
      
    } catch (error) {
      console.log(error);

    }finally{
      setIsLoading(false)
    }
  }

  const getSkills = async()=>{
    try {
      const response = await axios.get(`${appUrl}skill`);
      const {data} = response;
      console.log(data);
      setSkills(data);
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }

  };

  React.useEffect(()=>{
    getSkills();
  }, []);

  return (
    <div className='section'>
      <Loader hide={!isLoading?'hide-loader':''}/>
    <div className='container content-container'>
      

      {
        skills?.map((skill)=>{
          const {skillTitle, skillRating} = skill;

          return(
            <form key={skillTitle} className='section-form'>
              <div className="row">
                <div className="col">
                  <input disabled name='skillTitle' value={skillTitle} onChange={handleOnChangeSkill}  type="text" placeholder='Enter skill name' className='section-form-input' />
                </div>
                <div className="col">
                  <input disabled name='skillRating' value={skillRating} onChange={handleOnChangeSkill}  type="Number" placeholder='Enter skill rating' className='section-form-input' />
                </div>
              </div>

              <div className="section-button-container">
                <button onClick={()=>handleDisplayEditSkills(skill._id)} type='button' className='section-btn edit-btn'>Edit</button>
                <button onClick={()=>{deleteSkill(skill._id)}} type='button' className='section-btn del-btn'>Delete</button>
              </div>
            </form>

          )

          
        })
      }

      <button onClick={handleDisplayAddSkills} type='button' className="section-btn add-btn">Add</button>
    </div>

    {displayAddSkills?<SkillsAdd getSkills={getSkills} setDisplayAddSkills={setDisplayAddSkills} displayAddSkills={displayAddSkills}/>:<></>}
    {displayEditSkills?<EditSkill editSkill={editSkill} handleOnChangeSkill={handleOnChangeSkill} skill={skill} setDisplayEditSkills={setDisplayEditSkills} displayEditSkills={displayEditSkills}/>:<></>}
  
  </div>
  )
}

export default Skills