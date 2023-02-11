import React, { useEffect } from 'react';
import UserItem from './UserItem';
import "./UserItem.css"
import "./UsersList.css" 

const Userlist =  (props) => {
       
        if(props.items.length === 0)
        {
            return(
                <div className='no-users' >
                    <h2>No Users Found</h2>
                    <p> please Signup </p>
                </div>
            )
        }
    
 
  return (
    <div className='users-list' >
  
        <ul>
            {props.items.map(user=> <UserItem 
            key={user.id}
            id = {user.id}
            name = {user.name}
            image = {user.image}
            placesCount = {user.places.length}
             />)}
        </ul>
    </div> 
  )
}

export default Userlist