import React from 'react';
import UserItem from './UserItem';
import "./UserItem.css"
import "./UsersList.css" 

const Userlist =  (props) => {
  
    if(props.items.length === 0)
    {
        return(
            <div className='center' >
                <h2>no users found</h2>
            </div>
        )
    }

    console.log(props.items)

  return (
    <div className='users-list' >
 
        <ul>
            {props.items.allUsers.map(user=> <UserItem 
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