import { Car, Fuel, Home, Hotel } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NavBottom = () => {
  return (
    <div>
      <div
        class="fixed z-50 w-48 h-10  -translate-x-1/2 bg-white border
       border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600"
      >
        <div class="grid h-full  grid-cols-5 mx-auto cursor-pointer">
          <div className="m-1 px-6">
            <Home />
          </div>
          <div className="m-1  px-6">
            <Hotel />
          </div>
          <div className=" m-1  px-6">
            <Car />
          </div>
          <div className="m-1  px-6">
            <Link to="/maps">
              <Fuel />
            </Link>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default NavBottom;
