import React, { useContext, useState } from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import BasicMenu from "../Modals/navbarMenu";
import { useNavigate } from "react-router-dom";
import ListingContext from "../context/listingContext";

const Navbar = () => {
  const { authenticateUser } = useContext(ListingContext);
  const token = authenticateUser();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearchBtn = (e) => setSearch(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      navigate("/");
      return;
    }
    navigate(`/s?location=${search}`);
  };

  return (
    <div className="navbar fixed top-0 right-0 w-full bg-white shadow-md border-b border-gray-200 z-[50] transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-10 py-4 max-w-7xl mx-auto space-y-3 md:space-y-0">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/")}
        >
          <StarHalfIcon className="text-[#FF385C] text-3xl sm:text-4xl" />
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-semibold ml-2 tracking-wide italic">
            Luxora
          </h1>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-2/3 md:w-1/3 max-w-lg">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search luxury stays..."
              value={search}
              onChange={handleSearchBtn}
              className="w-full px-5 py-3 rounded-full border border-gray-300 bg-gray-100 text-gray-900 shadow-sm placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-[#FF385C] transition-all duration-300 hover:shadow-md text-sm sm:text-base"
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-[#FF385C] transition-all duration-300 hover:scale-110"
              type="submit"
            >
              🔍
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {token && (
            <h1
              onClick={() => navigate("/wishes")}
              className="cursor-pointer group relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="30"
                height="30"
                className="sm:w-8 sm:h-8"
              >
                <path
                  d="M2 6h10l10 40h32l8-24H16"
                  fill="none"
                  stroke="#000"
                  strokeWidth="2"
                />
                <circle cx="20" cy="54" r="4" fill="#000" />
                <circle cx="48" cy="54" r="4" fill="#000" />
                <path
                  d="M32 12c0-4 4-6 6-6s6 2 6 6c0 4-6 8-6 8s-6-4-6-8z"
                  fill="#f00"
                />
              </svg>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-600 text-white text-sm rounded px-2 py-1 shadow-lg z-10 whitespace-nowrap">
                Wishlist
              </div>
            </h1>
          )}
          <h1
            className="cursor-pointer text-white text-sm sm:text-base font-medium px-4 sm:px-6 py-2 bg-[#FF385C] rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/add")}
          >
            + Add Listing
          </h1>
          <BasicMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
