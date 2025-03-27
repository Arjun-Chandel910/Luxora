import React, { useState } from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import BasicMenu from "../util/navbarMenu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-10 py-4 max-w-7xl mx-auto">
        {/* Left Section - Logo */}
        <div
          className="flex items-center cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={() => navigate("/")}
        >
          <StarHalfIcon className="text-[#FF5A5F] text-3xl" />
          <h1 className="text-gray-900 text-2xl font-semibold ml-2 tracking-wide">
            Luxora
          </h1>
        </div>

        
        {/* Middle Section - Search Bar */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-2 rounded-full border border-gray-300 shadow-sm text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] transition"
          />
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#FF5A5F] transition"
            onClick={() => alert(`Searching for: ${search}`)}
          >
            🔍
          </button>
        </div>

        {/* Right Section - Menu */}
        <div className="flex items-center space-x-6">
          <h1
            className="cursor-pointer text-gray-800 text-lg font-medium hover:text-[#FF5A5F] transition"
            onClick={() => navigate("/add")}
          >
            Add Listing
          </h1>
          <BasicMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
