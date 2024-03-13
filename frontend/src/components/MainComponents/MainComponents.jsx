import React, { useEffect, useState } from "react";

import EcoList from "../EcoCompnents/EcoList";
import axios from "axios";

const MainComponents = () => {
  // Develop a solution that promotes eco-friendly travel, guiding users in sustainable choices to reduce their environmental impact.

  const [informUser, setinformUser] = useState([]);

  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setinformUser(location.data);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="mx-4">
      {/* <p>df{informUser.city}</p>
         {location && (
        <p>
          Current Location: {location.latitude}, {location.longitude}
        </p>
      )} */}
      <EcoList informUser={informUser} />
    </div>
  );
};

export default MainComponents;
