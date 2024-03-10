import React, { useEffect, useState } from "react";

import EcoList from "../EcoCompnents/EcoList";

const MainComponents = () => {
    // Develop a solution that promotes eco-friendly travel, guiding users in sustainable choices to reduce their environmental impact.


  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error(error.message);
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation(); // Get the initial location

    // Optionally, you can set up a timer to continuously update the location
    const locationTracker = setInterval(() => {
      getLocation();
    }, 5000); // Update every 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(locationTracker);
  }, []);
  return (
    <div className="mx-4">
         {location && (
        <p>
          Current Location: {location.latitude}, {location.longitude}
        </p>
      )}
     <EcoList/>
   
     
    </div>
  );
};

export default MainComponents;
