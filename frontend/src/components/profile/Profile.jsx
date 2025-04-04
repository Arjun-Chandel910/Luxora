import React, { useContext, useEffect, useState } from "react";
import ListingContext from "../../context/listingContext";

export const Profile = () => {
  const { authenticateUser } = useContext(ListingContext);
  const token = authenticateUser();
  const [user, setUser] = useState({});
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      const res = await fetch(`http://localhost:3000/api/profile`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "auth-token": `${token}`,
        },
      });

      const data = await res.json();
      setUser(data);

      const listingRes = await fetch(
        `http://localhost:3000/api/listings/user/${data._id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const listings = await listingRes.json();
      setUserListings(listings);
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-rose-300 shadow">
            <img
              src={user?.image?.url || "/default-profile.png"}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-gray-500 mt-1 text-md">{user?.email}</p>
            <span className="mt-2 text-sm text-rose-500 font-medium">
              Luxora Verified ✅
            </span>
          </div>
        </div>

        {/* Listings Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Listings
          </h2>
          {userListings.length === 0 ? (
            <p className="text-gray-500 text-center">No listings posted yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-48 w-full">
                    <img
                      src={listing.image?.url || "/listing-placeholder.jpg"}
                      alt={listing.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {listing.title}
                    </h3>
                    <p className="text-sm text-gray-500">{listing.location}</p>
                    <p className="text-rose-500 font-medium mt-2">
                      ${listing.price} / night
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
