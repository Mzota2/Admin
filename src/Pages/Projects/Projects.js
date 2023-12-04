import React from 'react'
import ProjectsAdd from './ProjectsAdd';
import Loader from '../../Components/Loader/Loader';
import {useAuth} from '../../Components/Hooks/useAuth';

import axios from 'axios';
import EditProject from './EditProject';

import { appUrl } from '../../Helpers';

function Projects() {

  const [isLoading ,setIsLoading] = React.useState(true);
  const [projects, setProjects] = React.useState();

  const [displayAddProjects, setDisplayAddProjects] = React.useState(false);
  const [project, setProject] = React.useState({});
  function handleDisplayAddProjects(id){
    setDisplayAddProjects(!displayAddProjects);
    if(projects){
      const foundProject = projects.find((project)=> project._id === id);
      setProject(foundProject);
    }
  }

  const [displayEditProjects, setDisplayEditProjects] = React.useState(false);

  function handleDisplayEditProjects(id){
    setDisplayEditProjects(!displayEditProjects);
    if(projects){
      const foundProject = projects?.find((project)=> project._id === id);
      setProject(foundProject);
    }
  }


 


  const deleteProject = async(id)=>{
    try {
      setIsLoading(true);

      const response = await axios.delete(`${appUrl}project/${id}`);
      const {data} = response;
      console.log(data)
      getProjects();
      
    } catch (error) {
      console.log(error);

    }finally{
      setIsLoading(false)
    }
  }

  const getProjects = async()=>{
    try {
      const response = await axios.get(`${appUrl}project`);
      const {data} = response;
      console.log(data);
      setProjects(data);
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }

  };

  React.useEffect(()=>{
    if(isLoading){
      getProjects();
    }
    
  }, []);


  return (
    <div className='section'>
      <Loader hide={!isLoading?'hide-loader':''}/>
      <div className='container content-container'>
        {
          projects?.map((project)=>{
            const{projectName, projectDescription,projectLiveLink, projectGitHubLink, projectImage} = project;

            return(
                <form key={projectName} className='section-form'>
                  <div className="row">
                    <div className="col">
                      <input disabled name='projectName' value={projectName}  type="text" placeholder='Enter project name' className='section-form-input' />
                    </div>
                    <div className="col">
                      <textarea disabled name="projectDescription" value={projectDescription}  id="" cols="30" rows="10" className='section-form-input' placeholder='Enter description text' ></textarea>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <input disabled name='projectLiveLink' value={projectLiveLink}  type="text" placeholder='Enter project Live link' className='section-form-input' />
                    </div>
                    <div className="col">
                      <input disabled name='projectGitHubLink' value={projectGitHubLink}  type="text" placeholder='Enter project Github link' className='section-form-input' />
                    </div>
                  </div>

                  <div className="col">
                    <label htmlFor="project-image">Project image</label><br />
                    {projectImage && <p>{typeof(projectImage) !== 'string'?'':projectImage.slice(21)}</p>}
                  </div>

                  <div className="button-container">
                    <button onClick={()=>{handleDisplayEditProjects(project._id)}} type='button' className='section-btn edit-btn'>Edit</button>
                    <button onClick={()=>{deleteProject(project._id)}} type='button' className='section-btn del-btn'>Delete</button>
                  </div>
                </form>
            )
          })
        }
        
        <button onClick={handleDisplayAddProjects} type='button' className="section-btn add-btn">Add</button>
      </div>

      {displayAddProjects?<ProjectsAdd getProjects={getProjects} setDisplayAddProjects={setDisplayAddProjects} displayAddProjects={displayAddProjects}/>:<></>}
      {displayEditProjects?<EditProject getProjects={getProjects}  foundProject={project} setDisplayEditProjects={setDisplayEditProjects} displayEditProjects={displayEditProjects}/>:<></>}
  
    </div>
  )
}

export default Projects