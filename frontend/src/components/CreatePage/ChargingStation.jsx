import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageComponents from "./ImageComponents";
import StationCharge from "../MapFuels/StationCharge";

const ChargingStation = () => {
  const [chargingname, setchargingname] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [chargingaddress, setchargingaddress] = useState("");
  const [cheapestPrice, setcheapestPrice] = useState("");
  // const [buttonDisabled, setButtonDisabled] = useState(false);

  const [latitudes,setlatitudes ] = useState("");
  const [longitudes,setlongitudes ] = useState("");

  
  

  const navigate = useNavigate();
  const chargeClick = async () => {
    try {
      const response = await fetch("/api/charging/newcharge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chargingname,
          country,
          chargingaddress,
          city,
          cheapestPrice,
          latitude: latitudes,
          longitude: longitudes,
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        alert("Something went wrong");
      } else {
        alert(`Successfully created ${chargingname}`);
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      // Handle errors here
    } finally {
      // setButtonDisabled(false);
    }
  };
  
      


 
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 mx-2 gap-2">
        <div className=" col-span-2 mt-3">
          <span className="label-text">Station Name</span>
          <input
            type="text"
            placeholder="Type here"
            value={chargingname}
            onChange={(e) => setchargingname(e.target.value)}
            className="input input-bordered input-primary w-full"
          />
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <label className="label-text">Country</label>
              <input
                type="text"
                placeholder="Type here"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="input input-bordered input-primary w-full capitalize"
              />
            </div>

            <div>
              <label className="label-text">City</label>
              <input
                type="text"
                placeholder="Type here"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input input-bordered input-primary w-full capitalize"
              />
            </div>
           
            <div>
              <label className="label-text">Price</label>
              <input
                type="number"
                placeholder="Type here"
                value={cheapestPrice}
                onChange={(e) => setcheapestPrice(e.target.value)}
                className="input input-bordered input-primary w-full capitalize"
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="label-text">Address</label>
            <input
              type="text"
              placeholder="Type here"
              value={chargingaddress}
              onChange={(e) => setchargingaddress(e.target.value)}
              className="input input-bordered input-primary w-full capitalize"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button className="btn btn-outline btn-info" onClick={chargeClick}>
              Upload Doc
            </button>
          </div>
        </div>
        <div>
          <StationCharge address={chargingaddress} country={country} city={city}  setlatitudes={setlatitudes} setlongitudes={setlongitudes}/>
        </div>
      </div>
    </div>
  );
};

export default ChargingStation;
