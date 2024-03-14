import React, { useEffect, useState } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon  from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import * as ELG from 'esri-leaflet-geocoder'


let DefaultIcon = L.icon({
    iconUrl:icon,
    shadowUrl:iconShadow
})

L.Marker.prototype.options.icon = DefaultIcon

const GeoTravel = ({ address, hotelnames }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]); // Default position

  useEffect(() => {
    ELG.geocode()
      .text(address)
      .run((err, results, response) => {
        if (results?.results?.length > 0) {
          const { lat, lng } = results?.results[0].latlng;
          setPosition([lat, lng]);
          map.flyTo([lat, lng], 14);
        }
      });
  }, [address, map]);

  // Function to handle marker drag event
  const handleMarkerDrag = (e) => {
    setPosition([e.target._latlng.lat, e.target._latlng.lng]);
  };

  // console.log(position);

  return (
    <Marker position={position} icon={DefaultIcon} draggable={true} eventHandlers={{ dragend: handleMarkerDrag }}>
      <Popup>
        {hotelnames} <br />
        Latitude: {position[0]} <br />
        Longitude: {position[1]}
      </Popup>
    </Marker>
  );
};

export default GeoTravel;
