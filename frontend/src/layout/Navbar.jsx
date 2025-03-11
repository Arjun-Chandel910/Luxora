import React, { useContext } from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import BasicMenu from "../util/navbarMenu";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex my-3 mx-2">
        <StarHalfIcon className="text-[#FF5A5F]"></StarHalfIcon>
        <h1
          className="text-[#FF5A5F] text-4xl font-bold font-[Inter] mr-8"
          onClick={() => {
            navigate("/");
          }}
        >
          Luxora
        </h1>
        <h1
          className=" text-lg font-[Inter] mt-3 "
          onClick={() => {
            navigate("/add");
          }}
        >
          Add-Listing
        </h1>
      </div>
      <div>
        <BasicMenu></BasicMenu>
      </div>
    </div>
  );
};

export default Navbar;
