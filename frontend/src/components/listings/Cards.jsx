import React from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Cards({ data }) {
  const listing = data;

  return (
    <Link to={`/${listing._id}`} className="no-underline">
      <div className="relative w-[200px] h-[370px] sm:w-[300px] sm:h-[370px]   bg-white rounded-2xl transition-all   hover:shadow-lg transition-transform  my-4 overflow-hidden overflow-y-auto group box-border">
        {/* image */}
        <div className="w-full h-3/4 rounded-2xl bg-rose-500 overflow-hidden mb-2">
          <img
            src={listing.image.url}
            alt={listing.image.filename}
            className="w-full h-full object-cover bg-rose-500 "
          />
        </div>
        <div className="absolute top-2 right-3  ">
          <FavoriteIcon
            style={{
              color: "gray", // fills the heart with gray
              stroke: "white", // white outline
              strokeWidth: 1.5,
            }}
          />
        </div>

        {/* card content */}
        <div className="p-1 ">
          <h1 className="">{listing.title}</h1>
          <h1 className="italic text-gray-600 font-normal text-sm">
            {listing.location}, {listing.country}
          </h1>
          <h1 className="mt-1">&#8377;{listing.price}/ night</h1>
        </div>
      </div>
    </Link>
  );
}
