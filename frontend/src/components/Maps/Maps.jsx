import React from "react";
import {MapContainer, TileLayer} from 'react-leaflet'
import GeoCoderMarker from "./GeoCoderMarker";

const Maps = ({address,city,country}) => {
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
        <GeoCoderMarker address={`${address} ${city} ${country}`} />
      </MapContainer>
    </div>
  );
};

export default Maps;
