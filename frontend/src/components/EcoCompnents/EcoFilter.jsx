import React from "react";
import { Country } from "country-state-city";

const EcoFilter = ({ setSearchParams, searchParams }) => {
  let countryData = Country.getAllCountries();

  return (
    <div >
      {/* <div>
        <label>Search</label>
        <div className="form-control mt-1">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-80"
          />
        </div>
      </div> */}
      <div className="mt-3">
        <label>Select Country</label>
        <div>
        <select
          className="select select-bordered w-80"
          defaultValue={searchParams.get("category") || ""}
          onChange={(e) => {
            setSearchParams((prev) => {
              prev.set("category", e.target.value);
              return prev;
            });
          }}
        >
          <option>All</option>
          {countryData?.map((item) => (
            <option value={item.name}>{item.name}</option>
          ))}
        </select>
        </div>
       
      </div>
      <div className="mt-3">
        <label>Select City</label>
        <div>
        <input
            type="text"
            placeholder="Search City"
            defaultValue={searchParams.get("city") || ""}
            onChange={(e) => {
              setSearchParams((prev) => {
                prev.set("city", e.target.value);
                return prev;
              });
            }}
            className="input input-bordered w-80"
          />
        </div>
       
      </div>
      <div className="mt-3">
        <label>Price Range</label>
        <div className="flex justify-start items-center mt-3">
          <p className="px-3">From</p>{" "}
          <input
            type="text"
            placeholder="Price From"
            className="input input-bordered w-48"
          />
        </div>
        <div className="flex justify-start items-center mt-4">
          <p className="px-6">To</p>{" "}
          <input
            type="text"
            placeholder="Price To"
            className="input input-bordered w-48"
          />
        </div>
      </div>
    </div>
  );
};

export default EcoFilter;
