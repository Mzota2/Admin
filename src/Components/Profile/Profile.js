import React from 'react'
import './Profile.css';
import axios from 'axios';
import{ appUrl} from '../../Helpers'

function Profile({handleShowSettings}) {
  const [image, setImage] = React.useState('');

  async function getImage (){
    try {
      const response = await axios.get(`${appUrl}home`);
      const data = response.data[0];
      const {profileImage} = data;
      console.log(profileImage)
      setImage(profileImage);
            
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(()=>{
    getImage();
  }, [image])
  return (
    <div onClick={handleShowSettings} className='profile-container'>
        <img src={`${appUrl}uploads${image.slice(7)}`} alt="" />
    </div>
  )
}

export default Profile