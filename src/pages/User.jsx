 
 import React , {useEffect , useState} from 'react'
 import Userlist from '../components/Userlist'
import { MoonLoader } from 'react-spinners'
import './Auth.css';
 const User = () => {
   
   const[loading , setloading] = useState(false)
    const[ User,setUser] = useState([])

   useEffect(()=>{
      
      setloading(true)

     fetch("http://localhost:5000/api/users").then(res=>res.json()).then(data=>{
      setUser(data)
      setloading(false)
   })
     .catch(err=>{
      setloading(false)
      console.log(err)
     })

   } , [])
  
   return (
      <div>
        {loading ? <div className='spinner' >
     <MoonLoader color='green' loading={loading} size="70px" />
     </div> : 
       <Userlist items = {User}/>
     } 
      </div>
   )
 }
 
 export default User