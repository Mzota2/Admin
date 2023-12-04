import React from 'react'

function EditSkill({displayEditSkills, setDisplayEditSkills, skill,handleOnChangeSkill, editSkill}) {

    function handleDisplayEditSkills(){
        setDisplayEditSkills(!displayEditSkills);
    }
    
  return (
    <div className="section-overlay">
        <div onMouseLeave={handleDisplayEditSkills} className='container add-container'>
            <form className='section-form'>
            <div className="row">
                <div className="col">
                <input name='skillTitle' value={skill.skillTitle} onChange={handleOnChangeSkill} type="text" placeholder='Enter skill name' className='section-form-input' />
                </div>
                <div className="col">
                    <input name='skillRating' value={skill.skillRating} onChange={handleOnChangeSkill} type="Number" placeholder='Enter skill rating' className='section-form-input' />
                </div>
            </div>

            <button type='button' onClick={()=> {editSkill(skill._id); handleDisplayEditSkills();}} className='create-btn section-btn add-btn'>Submit</button>

            </form>
        </div>
    </div>
  )
}

export default EditSkill