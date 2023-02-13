import React , {useContext ,useEffect} from 'react'

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/Button/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Auth from '../../pages/Auth';
import { AuthContext } from '../../shared/context/auth-context';
import useHttpClient from '../../shared/hooks/http-hook';
import { MoonLoader } from 'react-spinners'


import "./PlaceItem.css"

function PlaceItem(props) {
   console.log(props.image)

   const auth  = useContext(AuthContext) 


   const [showMap ,setshowMap] = React.useState(false)
   const [showConfirmModal , setshowConfirmModal] = React.useState(false)
   const {isLoading , sendRequest} = useHttpClient()
   const closeMapHandler = ()=>{setshowMap(false)}
   const showMapHandler = ()=>{setshowMap(true)}
   
    
   const CancelDeleteHandler = ()=>{setshowConfirmModal(false)}
    const showDeleteHandlerWarning = ()=>{setshowConfirmModal(true)}

   const ConfirmDeleteHandler =async ()=>{
              setshowConfirmModal(false)
               let userId = auth.userId;
               try{
                   await sendRequest(import.meta.env.VITE_REACT_APP_BACKEND_URL+`/Places/${props.id}`,"DELETE" , " ",
                 {  Authorization:"Bearer " + auth.token}
                    ) 
                }catch(err){
                    console.log(err)
                }
              
              
                props.onDelete(props.id)
            } 
 
            
    return ( 
       <>  
         {/*   this model appear when we click show map   */}
           <Modal 
            show={showMap}
            onCancel = {closeMapHandler}
            header = {props.address}
            contentClass = "place-item__modal-content"
            footerClass = "place-item__modal-actions"
            footer = {<Button onClick={closeMapHandler} >CLOSE</Button>}
           >
            <div className="map-container">
               <h2>The Map</h2>
            </div> 
             </Modal> 
            
         {/*   this model appear when we click  delete map   */}
            <Modal 
              show = {showConfirmModal}
              onCancel = {CancelDeleteHandler}
              header = "Are you sure"
              footerClass = "place-item__modal-actions"
              footer ={ 
               <>
               <Button inverse onClick = {CancelDeleteHandler}>Cancel</Button>
               <Button danger onClick = {ConfirmDeleteHandler}>Delete</Button>

               </>
              } 
            /> 
              
 
        
       { 
        isLoading ? <div className='spinner' >
       <MoonLoader color='green' loading={isLoading} size="70px" />
        </div> :
       <li className='place-item'>
            <Card className="place-item__content" >  

    <div className="place-item__image">
    <img src={ `http://localhost:5000/images/${props.image}`} alt={props.title} />
    </div>
     <div className="place-item__info">
        <h2>{props.title}</h2>
        <h3>{ props.address}</h3>
        <p className='image-description' > {props.description} </p>
     </div>
     <div className="place-item__actions">
        <Button inverse onClick={showMapHandler} >view On Map</ Button>

        {props.createrId ===auth.userId &&  
        < Button to={`/Places/${props.id}`} >Edit</ Button>
        }
    
        {props.createrId === auth.userId && 
           
         < Button danger onClick = {showDeleteHandlerWarning} > Delete</ Button>
         }

     </div>
     </Card>
        </li>}

        </>
     );
}

export default PlaceItem;