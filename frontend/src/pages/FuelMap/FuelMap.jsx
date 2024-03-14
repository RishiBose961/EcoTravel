import React, { useState } from 'react'
import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import Routing from "./Routing";
import { useQuery } from '@tanstack/react-query';
import GeoCoderMarkesr from '../../components/Maps/GeoCoderMarkesr';
import CraeteModelMap from './CraeteModelMap';







const FuelMap = () => {
  const [latitudeone,setlatitudeone] = useState("")
  const [latitudetwo,setlatitudetwo] = useState("")
  const [longitudeone,setlongitudeone] = useState("")
  const [longitudetwo,setlongitudetwo] = useState("")

  const position = [23.3426, 85.3099];

  const fetchProduct = async () => {
    const response = await fetch(
      `/api/charging/23.3426/85.3099`
    );
    const data = await response.json();
    return data;
  };
  
  const {
    isPending,
    isError,
    error,
    data: product,
  } = useQuery({
    queryKey: ["productss"],
    queryFn: fetchProduct,
    staleTime: 10000,
  });
  
  if (isPending) {
    return <span>Loading...</span>;
  }
  
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  
  


  const chargeClick = async () => {
    try {
      const response = await fetch("/api/latlong/newlatlong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitudeone: latitudeone,
          longitudeone: longitudeone,
          latitudetwo: latitudetwo,
          longitudetwo: longitudetwo,
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        alert("Something went wrong");
      } else {
        alert(`Successfully created`);
        
      }
    } catch (err) {
      console.log(err.message);
      // Handle errors here
    } finally {
      // setButtonDisabled(false);
    }
  };
  
  return (
    <>
   <button onClick={chargeClick}>Create</button>
     <MapContainer center={position} zoom={13} style={{ height: "100vh" }} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     
      {
        product.data.map((item)=>(
          <GeoCoderMarkesr address={`${item.chargingaddress} ${item.city} ${item.country}`} />
        ))
      }
      <Routing setlatitudeone={setlatitudeone} setlongitudeone={setlongitudeone} setlatitudetwo={setlatitudetwo} setlongitudetwo={setlongitudetwo}/>
    </MapContainer>
    </>
   
  )
}

export default FuelMap