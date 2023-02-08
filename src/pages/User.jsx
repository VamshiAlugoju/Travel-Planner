 
 import React , {useContext, useEffect , useState} from 'react'
 import Userlist from '../components/Userlist'
import { MoonLoader } from 'react-spinners'
import useHttpClient from '../shared/hooks/http-hook';
import './Auth.css';
import { AuthContext } from '../shared/context/auth-context';
 

 const User = () => {
   
    const {isLoading,sendRequest} = useHttpClient()
    const[ User,setUser] = useState([])
    const auth = useContext(AuthContext)
   useEffect(()=>{
    try{

       async function fetchdata (){
        const data = await sendRequest("http://localhost:5000/api/users") 
        setUser(data)
      }
      fetchdata()
    }
    catch(err){
      // console.log(err)
    }
    
   }, [])
  
   return (
      <div>
        {isLoading ? <div className='spinner' >
     <MoonLoader color='green' loading={isLoading} size="70px" />
     </div> : 
       <Userlist items = {User}/>
     } 
      </div>
   )
 }
 
 export default User