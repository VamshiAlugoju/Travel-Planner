 
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
        const data = await sendRequest(import.meta.env.VITE_REACT_APP_BACKEND_URL+"/users") 
        let changedArray = new Array(data.allUsers.length);    // created to ensure 
        let loggedUser;                                        // that always the logged
        let i =1;                        
                            // user stays on top
        if(data.allUsers.length!==0 && auth.isLoggedIn){
          data.allUsers.forEach(ele => {
               if(ele._id === auth.userId){
                   loggedUser = ele;
               }
               else{
                 changedArray[i] = ele;
               }
               i++;
          });
            changedArray[0] = loggedUser;
            setUser(changedArray)
        }
        else{
          setUser(data.allUsers)
        }
          
      }
      fetchdata()  
    }
    catch(err){
       
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