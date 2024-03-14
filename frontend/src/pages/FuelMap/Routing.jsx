import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "./download.png"
});

export default function Routing({setlatitudeone, setlongitudeone,setlatitudetwo, setlongitudetwo}) {

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
        console.error("Geolocation is not supported by this browser.");
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

  setlatitudeone(location?.latitude)
  setlongitudeone(location?.longitude)

  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(23.3426, 85.3099), L.latLng(23.3426, 85.5099)],

      routeWhileDragging: true
    }).addTo(map);




    routingControl.on("waypointschanged", function(event) {
      const waypoints = event.waypoints;
      waypoints.forEach((waypoint, index) => {
        // console.log(`Waypoint ${index + 1}: Latitude ${waypoint.latLng.lat}, Longitude ${waypoint.latLng.lng}`);
       
        setlatitudetwo(waypoint.latLng.lat)
        setlongitudetwo(waypoint.latLng.lng)
       
      });
    });

    
    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}
