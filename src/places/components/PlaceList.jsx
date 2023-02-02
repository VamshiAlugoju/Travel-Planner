import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";

import "./PlaceList.css"

function PlaceList(props) {
  if (props.items.length === 0)
    return (
      <div className="place-list center">
        <Card>
          <h2>NO Places Found</h2>
          <button>share place</button>
        </Card>
      </div>
    );
  
  return (
    <ul>
      {props.items.map(place => {
        return <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          createrId ={place.creater}
          coordinates = {place.coordinates}
        />;
      })}
    </ul>
  );
}

export default PlaceList;
