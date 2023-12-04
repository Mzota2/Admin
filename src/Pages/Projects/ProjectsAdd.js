import React from 'react'
import axios from 'axios';
import { appUrl } from '../../Helpers';
import Loader from '../../Components/Loader/Loader';
function ProjectsAdd({setDisplayAddProjects, displayAddProjects, getProjects}) {

    const [isLoading, setIsLoading] = React.useState(false);

    const [project, setProject] = React.useState({
        projectName:'',
        projectDescription:'',
        projectLiveLink:'',
        projectGitHubLink:'',
        projectImage:''
    });

    function handleOnChangeProject(e){
        setProject(prev =>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    function handleOnChangeImage(e){
        setProject(prev =>{
            return{
                ...prev,
                projectImage:e.target.files
            }
        })
    }

    const addProject = async()=>{
        try {
            setIsLoading(true)
            const formData = new FormData();
            const fileList = project.projectImage;

            for(let i=0 ; i<fileList.length; i++){
                let file = fileList[i];
                formData.append('photo', file);
            }

            formData.append('projectName', project.projectName);
            formData.append('projectDescription', project.projectDescription);
            formData.append('projectLiveLink', project.projectLiveLink);
            formData.append('projectGitHubLink', project.projectGitHubLink);


            const response = await axios.post(`${appUrl}project`, formData, {
                headers:{
                    Accept:"application/json",
                    "Content-Type":"multipart/form-data"
                }
            });
            const {data} = response;
            console.log(data);

            getProjects();
            
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    function handleDisplayAddProjects(){
        setDisplayAddProjects(!displayAddProjects);
    }
    

  return (
    <div className="section-overlay">
        <Loader hide={!isLoading?'hide-loader':''}/>
        <div onMouseLeave={handleDisplayAddProjects} className='container add-container'>
            <form className='section-form'>
            <div className="row">
            <div className="col">
              <input name='projectName' value={project.projectTitle} onChange={handleOnChangeProject} type="text" placeholder='Enter project name' className='section-form-input' />
            </div>
            <div className="col">
                <textarea name="projectDescription" value={project.projectDescription} onChange={handleOnChangeProject} id="" cols="30" rows="10" className='section-form-input' placeholder='Enter description text' ></textarea>
            </div>
            </div>

            <div className="row">
                <div className="col">
                <input name='projectLiveLink' value={project.projectLiveLink} onChange={handleOnChangeProject} type="text" placeholder='Enter project Live link' className='section-form-input' />
                </div>
                <div className="col">
                <input name='projectGitHubLink' value={project.projectGitHubLink} onChange={handleOnChangeProject} type="text" placeholder='Enter project Github link' className='section-form-input' />
                </div>
            </div>

            <div className="col">
                <label htmlFor="project-image">Project image</label><br />
                {project?.projectImage&& <p>{typeof(project?.projectImage) !== 'string'?'':project?.projectImage.slice(21)}</p>} <br />

                <input name='photo' id='project-image' type="file"  onChange={handleOnChangeImage} placeholder='Upload project image' className='section-form-input'/>
            </div>
            <br />

            <button type='button' onClick={addProject} className='create-btn section-btn add-btn'>Submit</button>

            </form>
        </div>
    </div>
  )
}

export default ProjectsAdd