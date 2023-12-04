import React from 'react'
import './Messages.css';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useAuth } from '../Hooks/useAuth';
function Messages() {
    const [showFilter, setShowFilter] = React.useState(false);
    const{messages, loadMessages} = useAuth();

    const [selectedMessage, setSelectedMessage]= React.useState({});

    const menu = React.useRef(null);

    function closeOpenMenu(e){
        setShowFilter(false);

    }

  React.useEffect(()=>{

    document.addEventListener('mousedown', closeOpenMenu);

    return ()=>{
        document.removeEventListener('mousedown', closeOpenMenu);
    }

  }, [])

    function handleShowFilter(){
        setShowFilter(!showFilter);
    }

    const displayContacts = ()=>{
        return messages?.map((contact)=>{
            const {contactName} = contact;
            return(
                <li onClick={()=>{selectContact(contact._id)}} key={contactName} className="sender-name">{contactName}</li>
            )
        })  
    }

    const displayMessages = ()=>{
        return selectedMessage?.contactMessage?.map((message, index)=>{
            const h = new Date(selectedMessage?.createdAt).getHours();
            const min =new Date(selectedMessage?.createdAt).getMinutes();

            return( 
                <div key={index} className="message">
                    <p className="message-text">{message}</p>
                    <p className='message-time'>{h +':'+ min}</p>
                </div>
            )
        })
    }

    const selectContact = (id)=>{
        const foundMessage = messages.find((message)=> message._id === id);
        if(foundMessage){
            setSelectedMessage(foundMessage);
        } else{
            console.log('message not found');
        }
    }

  return (
    <div className='container'>
        <Loader hide={!loadMessages?'hide-loader':''}/>
        <div className="message-top-row">

        <p className='filter-icon' onClick={handleShowFilter}>Filter <i className="fas fa-filter"></i></p>
        {showFilter? <div ref={menu} className="filter-container filter-container-mobile">

            <p onClick={handleShowFilter} className="filter-option"><i className="fas fa-plus"></i> Latest</p>
            <p className="filter-option"><i className="fas fa-star"></i> Starred</p>
            <p className="filter-option"><i className="fas fa-heart"></i> Favourite</p>
            <p className="filter-option"><i className="fas fa-ban"></i> Blocked</p>
            <p className="filter-option"><i className="fas fa-hand-paper"></i>Ignored</p>
            <p className="filter-option"><i className="fas fa-comment-slash"></i> Not Responded</p>
            <p className="filter-option"><i className="fas fa-comment"></i> Responded</p>
        

        </div>:<></>}

        <div className="filter-container filter-container-desktop">
            <p className="filter-option"><i className="fas fa-plus"></i> Latest</p>
            <p className="filter-option"><i className="fas fa-star"></i> Starred</p>
            <p className="filter-option"><i className="fas fa-heart"></i> Favourite</p>
            <p className="filter-option"><i className="fas fa-ban"></i> Blocked</p>
            <p className="filter-option"><i className="fas fa-hand-paper"></i>Ignored</p>
            <p className="filter-option"><i className="fas fa-comment-slash"></i> Not Responded</p>
            <p className="filter-option"><i className="fas fa-comment"></i> Responded</p>
        
        </div>

        
        <div className="senders-container"> 
            <i className="fas friends-icon fa-users"></i>           
            {displayContacts()}
        </div>
        </div>
        

        <div className="message-container">
            
            {
                displayMessages()
            }

           {selectedMessage?.contactName? <div className="email-container">
                <button className='email-btn'><i className="fas fa-envelope-open"></i> Send Email</button>
            </div>:<></>}

        </div>

    
    </div>
  )
}

export default Messages