import React , {useContext} from 'react'

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/Button/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Auth from '../../pages/Auth';
import { AuthContext } from '../../shared/context/auth-context';


import "./PlaceItem.css"

function PlaceItem(props) {

   const auth  = useContext(AuthContext) 


   const [showMap ,setshowMap] = React.useState(false)
   const [showConfirmModal , setshowConfirmModal] = React.useState(false)

   const closeMapHandler = ()=>{setshowMap(false)}
   const showMapHandler = ()=>{setshowMap(true)}
    
   const CancelDeleteHandler = ()=>{setshowConfirmModal(false)}
    const showDeleteHandlerWarning = ()=>{setshowConfirmModal(true)}

   const ConfirmDeleteHandler = ()=>{console.log("deleting")}
   
    return ( 
       <>
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
              
 
        
        <li className='place_item'>
            <Card className="place-item__content" >  

    <div className="place-item__image">
    <img src={props.image} alt={props.title} />
    </div>
     <div className="place-item__info">
        <h2>{props.title}</h2>
        <h3>{ props.address}</h3>
        <p> {props.description} </p>
     </div>
     <div className="place-item__actions">
        <Button inverse onClick={showMapHandler} >view On Map</ Button>
        {auth.isLoggedIn  &&  
        < Button to={`/places/${props.id}`} >Edit</ Button>
        }
        {auth.isLoggedIn && 
         < Button danger onClick = {showDeleteHandlerWarning} > Delete</ Button>
         }

     </div>
     </Card>
        </li>

        </>
     );
}

export default PlaceItem;