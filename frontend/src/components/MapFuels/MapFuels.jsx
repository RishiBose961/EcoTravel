import React from 'react'
import GeoCoderMarker from '../Maps/GeoCoderMarker'
import {MapContainer, TileLayer} from 'react-leaflet'


const MapFuels = ({address,city,country}) => {
  return (
    <div>
    <MapContainer
      center={[53.35, 18.8]}
      zoom={1}
      scrollWheelZoom={true}
      style={{
        height: "80vh",
        width: "100%",
        zIndex: 0,
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoCoderMarker address={`${address} ${city} ${country}`} />
    </MapContainer>
  </div>
  )
}

export default MapFuels