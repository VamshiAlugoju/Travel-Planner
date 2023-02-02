 import React from 'react'

 import PlaceList from '../components/PlaceList';


 const User_Places = [
    {
       
          id : "p1" , 
          image : "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg" , 
          title : "rasengan" , 
          description : "this is an absolute win I guess so I'm returning" , 
          address : " 24 W 34th st, Telangana" , 
          createrId  : "u1",
          coordinates :{
            lat:102.36,
            long:264.694
          }  
    },
    {
       
        id : "p2" , 
        image : "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg" , 
        title : "rasengan" , 
        description : "this is an absolute win I guess so I'm returning" , 
        address : " 24 W 34th st, Telangana" , 
        createrId  : "u2",
        coordinates :{
          lat:102.36,
          long:264.694
        }  
  }
 ]

 function UserPlaces() {
    return ( 
         <PlaceList items = {User_Places} />
     )
 }
 
 export default UserPlaces;