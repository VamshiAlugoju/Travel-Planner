 
 import React from 'react'
 import Userlist from '../components/Userlist'

 
 const User = () => {
    const USER = [
     {name:"eren" ,
     id:"u1",
     image:"/images/img1.jpg",
     placesCount:5}
    ]
   return (
      <div>
       <Userlist items = {USER}/>
      </div>
   )
 }
 
 export default User