import React, { useContext } from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import BasicMenu from "../util/navbarMenu";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between font-mono">
      <div className="flex my-3 mx-2">
        <StarHalfIcon className="text-[#FF5A5F]"></StarHalfIcon>
        <h1
          className="text-[#FF5A5F] text-3xl font-bold font-mono"
          onClick={() => {
            navigate("/");
          }}
        >
          Luxora
        </h1>
      </div>
      <div>
        <BasicMenu></BasicMenu>
      </div>
    </div>
  );
};

export default Navbar;
