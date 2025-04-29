import React, { useContext, useEffect, useState } from "react";
import ListingContext from "../../context/listingContext";
import { Link } from "react-router-dom";
export const Profile = () => {
  const { authenticateUser } = useContext(ListingContext);
  const token = authenticateUser();
  const [user, setUser] = useState({});
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      const response = await fetch(`http://localhost:3000/api/userInfo`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "auth-token": `${token}`,
        },
      });

      const data = await response.json();
      setUser(data);

      const listingRes = await fetch(
        `http://localhost:3000/listing/userListings`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "auth-token": `${token}`,
          },
        }
      );

      const listings = await listingRes.json();
      setUserListings(listings);
    };

    fetchUser();
  }, []);
  console.log(userListings);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* profile Section */}
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
          {/*profile Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-rose-300 shadow">
            <img
              src={
                user?.image?.url ||
                "https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* user Info */}
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-gray-500 mt-1 text-md">{user?.email}</p>
            <span className="mt-2 text-sm text-rose-500 font-medium">
              Luxora Verified ✅
            </span>
          </div>
        </div>

        {/* listing section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-500 mb-4 text-center mb-6">
            Your Listings
          </h2>
          {userListings.length === 0 ? (
            <p className="text-gray-500 text-center">No listings posted yet.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {userListings.listings.map((d) => {
                return (
                  <Link to={`/${d._id}`} className="no-underline">
                    <div className="cursor-pointer  hover:scale-[1.01] bg-white shadow-lg transition flex flex-col sm:flex-row justify-between  w-[80%] mx-auto h-60 sm:h-30  rounded-4xl overflow-x-auto overflow-y-auto">
                      <div className="sm:w-1/4">
                        {" "}
                        <img
                          src={d.image.url}
                          className="h-30 w-1/1 rounded-4xl bg-rose-400"
                          alt=""
                        />
                      </div>

                      <div className="sm:w-3/4  flex-col p-10 sm:p-0 sm:ml-50 ">
                        <h1 className="text-[#FF385C] text-2xl">{d.title}</h1>
                        <h1 className="text-sm text-gray-500 mb-4 mt-1">
                          {d.location}
                        </h1>
                        <h1 className="">{d.price}/night</h1>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
