// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageComponents from "./ImageComponents";

const StoryCreate = () => {
  const [storytitle, setstorytitle] = useState("");
  const [storydescription, setstorydescription] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  // const [buttonDisabled, setButtonDisabled] = useState(false);

  const [url, setUrl] = useState("");
  const [thumnail, setThumnail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [uploaded, setUploaded] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    if (url) {
      // setButtonDisabled(true);
      fetch("/api/story/newstorys", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storytitle,
          storydescription,
          country,
          city,
          // Send all public IDs and URLs for flexibility
          imagestory: url.map((imageDatas) => imageDatas.secure_url),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            alert("Something went wrong");
          } else {
            alert(`Successfully created ${storytitle}`);
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
              <span className="label-text">Story Title</span>
              <input
                type="text"
                placeholder="Story Title"
                value={storytitle}
                onChange={(e) => setstorytitle(e.target.value)}
                className="input input-bordered input-primary w-full"
              />
            </div>
            <div>
              <span className="label-text">Description </span>
              <input
                type="text"
                placeholder="Description"
                value={storydescription}
                onChange={(e) => setstorydescription(e.target.value)}
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
          </div>

          <div className="flex justify-center mt-4">
            <button className="btn btn-outline btn-info" onClick={postDetails}>
              Upload Doc
            </button>
          </div>
        </div>
        <div>
          <h1>
            {uploaded && (
              <>
                <div>
                  <p>{`${uploaded} %`}</p>
                </div>
              </>
            )}
          </h1>
          <ImageComponents thumnail={thumnail} setThumnail={setThumnail} />
        </div>
      </div>
    </div>
  );
};

export default StoryCreate;
