import React from "react";
import {MapContainer, TileLayer} from 'react-leaflet'
import GeoTravel from "./GeoTravel";

const Maps = ({address,city,country,hotelnames}) => {
  return (
    <div>
      <MapContainer
        center={[53.35, 18.8]}
        zoom={1}
        scrollWheelZoom={true}
        style={{
          height: "50vh",
          width: "100%",
          zIndex: 0,
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoTravel hotelnames={hotelnames} address={`${address} ${city} ${country}`} />
      </MapContainer>
    </div>
  );
};

export default Maps;
