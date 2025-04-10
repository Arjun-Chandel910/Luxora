import React, { useContext, useState } from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import BasicMenu from "../Modals/navbarMenu";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleSearchBtn = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search == "") {
      navigate("/");
      return;
    }
    navigate(`/s?location=${search}`);
  };
  return (
    <div className="navbar fixed top-0 right-0 w-full bg-white shadow-md border-b border-gray-200 z-[50] transition-all duration-300">
      <div className="flex justify-between items-center px-10 py-4 max-w-7xl mx-auto">
        <div
          className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/")}
        >
          <StarHalfIcon className="text-[#FF385C] text-4xl" />
          <h1 className="text-gray-900 text-3xl font-semibold ml-2 tracking-wide italic">
            Luxora
          </h1>
        </div>

        <div className="relative w-1/3 max-w-lg">
          <form action="" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search luxury stays..."
              value={search}
              onChange={handleSearchBtn}
              className="w-full px-5 py-3 rounded-full border border-gray-300 bg-gray-100 text-gray-900 shadow-sm placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-[#FF385C] transition-all duration-300 hover:shadow-md"
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-[#FF385C] transition-all duration-300 hover:scale-110"
              type="submit"
            >
              🔍
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-6">
          <h1
            className="cursor-pointer text-white text-lg font-medium px-6 py-2 bg-[#FF385C] rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
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
