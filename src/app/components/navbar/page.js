"use client";
import React, { useState, useEffect } from "react";
import { userLogout } from "@/store/reducer/common/logoutReducer";
import { FaBars, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FiBell, FiLogOut } from "react-icons/fi";
import { checkUserStats } from "@/store/reducer/common/checkUserStatsReducer";

const Navbar = ({ handleToggle, toggleDrawer }) => {
  const [userDetail, setUserDetail] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    await dispatch(userLogout());
    router.push("/");
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // fetch user stats
  useEffect(() => {
    // Dispatch the action to fetch user stats
    dispatch(checkUserStats())
      .then((response) => {
        // Assuming response.data is an array of user stats
        setUserDetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user stats:", error);
      });
  }, []);

  return (
    <div>
      {" "}
      {/* for header  */}
      <header>
        <nav className="bg-themeColor  px-4 lg:px-6 py-2.5 ">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <button className="hidden md:block" onClick={handleToggle}>
                <FaBars className="text-white mx-2" />
              </button>
              <button className="block md:hidden" onClick={toggleDrawer}>
                <FaBars className="text-white mx-2" />
              </button>

              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white mx-2">
                UPASTHITI
              </span>
            </div>
            <div className="flex items-center lg:order-2">
              <button
                href="#"
                className="flex items-center block py-2 px-4 text-sm hover:bg-gray-100 rounded text-white hover:text-themeColor border border-card"
                onClick={handleLogout}
              >
                <FiLogOut className="mx-2" /> Sign out
              </button>
              <button
                href="#"
                className="block py-2 px-4 text-sm  rounded text-white "
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FiBell className="mx-2 text-xl" />
              </button>

              <button
                type="button"
                className="relative flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle the state on click
              >
                <span className="sr-only">Open user menu</span>
                {userDetail && (
                  <div className="text-themeColor rounded-full p-2 bg-card">
                    {userDetail.firstName.charAt(0)}
                    {userDetail.lastName.charAt(0)}
                  </div>
                )}
              </button>

              <div
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } z-50 my-4 absolute top-[35px]  right-[10px] w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg `}
                id="dropdown"
              >
                {userDetail && (
                  <div className="py-3 px-4 ">
                    <span className="block text-sm font-semibold text-gray-900 ">
                      {userDetail.firstName} {userDetail.lastName}
                    </span>
                    <span className="block text-sm font-light text-gray-500 truncate ">
                      {userDetail.email}
                    </span>
                  </div>
                )}

                <ul
                  className="py-1 font-light text-gray-500 "
                  aria-labelledby="dropdown"
                >
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm hover:bg-gray-100 "
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={handleLogout}
                      className="block py-2 px-4 text-sm hover:bg-gray-100 "
                    >
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* end header  */}
    </div>
  );
};

export default Navbar;
