 import React , {useEffect ,useContext ,useState } from 'react'
import { useParams } from 'react-router-dom';
 import PlaceList from '../components/PlaceList';
import useHttpClient from '../../shared/hooks/http-hook';
 import { AuthContext } from '../../shared/context/auth-context';

 function UserPlaces() {

     const {isLoading , sendRequest } = useHttpClient()
     const auth  = useContext(AuthContext)
        const [Places , setPlaces] = useState([])

        const Deleted = (deletedPlaceId)=>{    
          setPlaces(prev=>{
            return prev.filter(place=>place._id != deletedPlaceId)
          })
        }

        let userId = useParams().userId;
 
       useEffect(()=>{
        ( async function (){
                 const url =import.meta.env.VITE_REACT_APP_BACKEND_URL+`/Places/user/${userId}`
               const data = await sendRequest(url)
              
               setPlaces(data.place)
        })()
      
      },[auth.userId,sendRequest])

     
     
  
    return ( 
         <PlaceList loading={isLoading} items = {Places} deletedPlace ={Deleted} />
     )
 }
 
 export default UserPlaces;