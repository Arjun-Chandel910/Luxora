import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ListingContext from "../../context/listingContext";
import FlashContext from "../../context/FlashContext";
export default function Cards({ data, wishlist, setWishlist }) {
  const navigate = useNavigate();

  const { authenticateUser } = useContext(ListingContext);
  const token = authenticateUser();
  const { showFlash } = useContext(FlashContext);
  const listing = data;

  const [heart, setHeart] = useState(false);
  useEffect(() => {
    const checkInWishlist = () => {
      setHeart(wishlist?.includes(listing._id));
    };
    checkInWishlist();
  }, [wishlist, listing._id]);

  const heartToggle = async (e) => {
    if (token) {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/wishlist/toggle`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "auth-token": `${token}`,
          },
          body: JSON.stringify({ listingId: listing._id }),
        }
      );
      setHeart(!heart);
      const data = await response.json();
      setWishlist(data.wishlist);

      if (data.success) {
        showFlash({ success: true, message: "Added to Wishlist!" });
      } else {
        showFlash({ success: false, message: "Removed from Wishlist!" });
      }
    } else {
      showFlash({ success: false, message: "You need to be login first!" });
      navigate("/login");
    }
  };

  return (
    <div className="relative w-[200px] h-[370px] sm:w-[300px] sm:h-[370px]   bg-white rounded-2xl transition-all   hover:shadow-lg transition-transform  my-4 overflow-hidden overflow-y-auto group box-border">
      {/* image */}
      <div className="w-full h-3/4 rounded-2xl  overflow-hidden mb-2">
        <Link to={`/${listing._id}`} className="no-underline">
          <img
            src={listing.image?.url}
            alt={listing.image?.filename}
            className="w-full h-full object-cover bg-rose-500 "
          />
        </Link>
      </div>
      <div className="absolute top-2 right-3  " onClick={heartToggle}>
        <FavoriteIcon
          style={{
            color: heart ? "#FF385C" : "gray",
            stroke: "white",
            strokeWidth: heart ? 0.4 : 1.5,
            transform: heart ? "scale(1.2)" : "scale(1)",
            filter: heart ? "drop-shadow(0 0 3px #FF385C)" : "none",
            transition: "all 0.2s ease",
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
  );
}
