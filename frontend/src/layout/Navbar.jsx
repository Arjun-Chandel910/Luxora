import React, { useContext } from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";

import BasicMenu from "../util/navbarMenu";
import ListingContext from "../context/listingContext";
const Navbar = () => {
  const state = useContext(ListingContext);
  const { obj } = state;

  return (
    <div
      className="flex justify-between font-mono
"
    >
      <div className="flex my-3 mx-2">
        <StarHalfIcon className="text-[#FF5A5F]"></StarHalfIcon>
        <h1 className="text-[#FF5A5F] text-3xl font-bold font-mono">Luxora</h1>
      </div>
      <div>
        <BasicMenu></BasicMenu>
      </div>
    </div>
  );
};

export default Navbar;
