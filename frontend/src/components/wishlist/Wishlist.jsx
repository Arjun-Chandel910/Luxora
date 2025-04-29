import React, { useContext, useEffect, useState } from "react";
import ListingContext from "../../context/listingContext";
import CalenderModal from "../../Modals/CalenderModal";
const Wishlist = () => {
  const [wishes, setWishes] = useState([]);
  const { authenticateUser } = useContext(ListingContext);
  const token = authenticateUser();
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        if (!token) {
          console.log("Unauthorized: No token");
          return;
        }
        const response = await fetch(
          `http://localhost:3000/api/wishlist/wishes`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              "auth-token": token,
            },
          }
        );
        const data = await response.json();
        setWishes(data);
      } catch (error) {
        console.error("Network Error:", error);
      }
    };
    fetchWishes();
  }, []);

  return (
    <div className="p-6 sm:p-10 bg-[#f9fafb] min-h-screen">
      <h2 className="text-3xl font-semibold flex items-center gap-2 text-gray-800 mb-1">
        <span role="img" aria-label="heart">
          💖
        </span>{" "}
        Saved Properties
      </h2>
      <p className="text-gray-500 mb-6">
        {wishes.length} stays in your wishlist
      </p>

      <div className="space-y-6">
        {wishes.map((listing) => (
          <div
            key={listing._id}
            className="bg-white rounded-xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition"
          >
            <div className="flex items-start sm:items-center gap-5">
              <img
                src={listing.image.url}
                alt={listing.title}
                className="w-full sm:w-40 h-28 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {listing.title}
                </h3>
                <p className="text-gray-600 text-sm">{listing.location}</p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 text-xs rounded-full">
                    Luxury
                  </span>
                  <span className="text-yellow-600 text-sm font-semibold flex items-center">
                    ⭐ {listing.rating || "4.5"}
                  </span>
                </div>

                <div className="flex gap-2 text-sm text-gray-400 mt-2">
                  <span>{listing.views || 100} views</span>
                  <span>•</span>
                  <span>Last viewed 2 days ago</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end items-start gap-3">
              <div className="text-right">
                <p className="text-xl font-bold text-gray-800">
                  &#8377;{listing.price}
                </p>
                <p className="text-xs text-gray-500">per night</p>
              </div>
              <div>
                <CalenderModal id={listing._id} token={token} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
