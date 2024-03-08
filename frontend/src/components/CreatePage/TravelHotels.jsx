import React from "react";

const TravelHotels = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <div className=" col-span-2 mt-3">
          <span className="label-text">Hotel Name</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full"
          />
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <label className="label-text">Country</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary w-full capitalize"
              />
            </div>

            <div>
              <label className="label-text">City</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary w-full capitalize"
              />
            </div>
            <div>
              <label className="label-text">Phone</label>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered input-primary w-full capitalize"
              />
            </div>
            <div>
              <label className="label-text">Upload 3 image</label>
              <input
                type="file"
                multiple
                className="file-input file-input-bordered file-input-primary w-full"
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="label-text">Address</label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full capitalize"
            />
          </div>
          <div className="flex justify-center mt-4">
          <button className="btn btn-outline btn-info">Upload Doc</button>
          </div>
          
        </div>
        <div>
          <h1>Create New</h1>
        </div>
      </div>
    </div>
  );
};

export default TravelHotels;
