// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageComponents from "./ImageComponents";

const TravelStation = () => {
  const [carname, setcarname] = useState("");
  const [carnumberplate, setcarnumberplate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [caraddress, setcaraddress] = useState("");
  const [cheapestPrice, setcheapestPrice] = useState("");
  const [vehicletype, setvehicletype] = useState("");
  // const [buttonDisabled, setButtonDisabled] = useState(false);

  const [url, setUrl] = useState("");
  const [thumnail, setThumnail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [uploaded, setUploaded] = useState();

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

  const navigate = useNavigate();
  useEffect(() => {
    if (url) {
      // setButtonDisabled(true);
      fetch("/api/travel/newtravels", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carname,
          carnumberplate,
          country,
          phone,
          caraddress,
          city,
          cheapestPrice,
          vehicletype,
          // Send all public IDs and URLs for flexibility
          imagecar: url.map((imageDatas) => imageDatas.secure_url),
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            alert("Something went wrong");
          } else {
            alert(`Successfully created ${carname}`);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          // setButtonDisabled(false);
        });
    }
  }, [url]);

  const postDetails = async () => {
    try {
      const uploadPromises = thumnail?.map(async (image) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          data,
          {
            onUploadProgress: (data) => {
              setUploaded(Math.round((data.loaded / data.total) * 100));
            },
          }
        );
        return res.data;
      });
      const uploadedUrls = await Promise.all(uploadPromises);
      setUrl(uploadedUrls);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 mx-2 gap-2">
        <div className=" col-span-2 mt-3">
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <span className="label-text">Car Name</span>
              <input
                type="text"
                placeholder="Car Name"
                value={carname}
                onChange={(e) => setcarname(e.target.value)}
                className="input input-bordered input-primary w-full"
              />
            </div>
            <div>
              <span className="label-text">Car Number Plate </span>
              <input
                type="text"
                placeholder="Car Number Plate"
                value={carnumberplate}
                onChange={(e) => setcarnumberplate(e.target.value)}
                className="input input-bordered input-primary w-full"
              />
            </div>
            <div>
              <label className="label-text">Country</label>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="input input-bordered input-primary w-full capitalize"
              />
            </div>

            <div>
              <label className="label-text">City</label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input input-bordered input-primary w-full capitalize"
              />
            </div>
            <div>
              <label className="label-text">Phone</label>
              <input
                type="number"
                placeholder="Type here"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            <div></div>
          </div>
          <div className="mt-1">
            <label className="label-text">Vehicle Type</label>
            <div>
              <select
                className="select w-full select-primary"
                onChange={(e) => setvehicletype(e.target.value)}
                value={vehicletype}
              >
                <option value="Electric Vechicle">
                  Electric Vechicle (EV)
                </option>
                <option value="Public Vechile">Public Vechile</option>
                <option value="Hybrid Vechile">Hybrid Vechile</option>
              </select>
            </div>
          </div>
          <div className="mt-2">
            <label className="label-text">Address</label>
            <input
              type="text"
              placeholder="Type here"
              value={caraddress}
              onChange={(e) => setcaraddress(e.target.value)}
              className="input input-bordered input-primary w-full capitalize"
            />
          </div>
          <div className="flex justify-center mt-4">
            {uploaded ? (
              <>
                <div>
                  <p>{`${uploaded} %`}</p>
                </div>
              </>
            ) : (
              <button
                className="btn btn-outline btn-info"
                onClick={postDetails}
              >
                Upload Doc
              </button>
            )}
          </div>
        </div>
        <div>
          <h1>Create New</h1>
          <ImageComponents thumnail={thumnail} setThumnail={setThumnail} />
        </div>
      </div>
    </div>
  );
};

export default TravelStation;
