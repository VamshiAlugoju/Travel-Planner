import React from 'react'

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/Button/Button';
import Modal from '../../shared/components/UIElements/Modal';


import "./PlaceItem.css"

function PlaceItem(props) {

   const [showMap ,setshowMap] = React.useState(false)
   const closeMapHandler = ()=>{setshowMap(false)}
   const showMapHandler = ()=>{setshowMap(true)}

   
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
        < Button>Edit</ Button>
        < Button danger > Delete</ Button>

     </div>
     </Card>
        </li>

        </>
     );
}

export default PlaceItem;