import React from 'react'
import './Loader.css';
function Loader({hide}) {
  
  return (
    <div className={`loader ${hide}`}></div>
  )
}

export default Loader