import React ,{useContext} from "react";
import { Link, useParams  } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import { NavLink } from 'react-router-dom';
import Button from "../../shared/components/Button/Button";
import { MoonLoader } from 'react-spinners';
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceList.css"

function PlaceList(props) {
  const auth = useContext(AuthContext)
  const params = useParams()
 
  if(props.loading)
  {
    return (
      <div className='spinner' >
      <MoonLoader color='green' loading={props.Loading} size="70px" />
      </div>
    )
  }
  if (props.items.length === 0 && !props.loading )
    return (
      <div className="place-list center">
        <Card>
          <h2>NO Places Found</h2>
        { params.userId === auth.userId && <Link to="/places/new"> <Button >add place</Button> </Link> }
        </Card>
      </div>
    );

  
  return (
    <ul>
      {props.items.map(place => {
        return <PlaceItem 
          key={place._id}
          id={place._id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          createrId ={place.creator}
          coordinates = {place.coordinates}
          onDelete = {props.deletedPlace}
        />;
      })}
    </ul>
  );
}

export default PlaceList;
