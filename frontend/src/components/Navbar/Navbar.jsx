import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/authSlices";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 border-b-2">
        <div className="flex-1">
          <Link to="/" className="text-xl">
            Eco Trip
          </Link>
        </div>

        {userInfo ? (
          <>
           
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full bg-gradient-to-r from-lime-400 to-lime-500">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={userInfo.avatar}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge bg-gradient-to-r from-lime-400 to-lime-500 text-black">{userInfo.username}</span>
                  </a>
                </li>
                <li>
                  <Link to="/new">Create</Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <div onClick={logoutHandler}>Logout</div>
                </li>
              </ul>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
