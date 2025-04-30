import React, { useContext, useEffect, useState } from "react";
import Cards from "./Cards";
import ListingContext from "../../context/listingContext";
import Filters from "./Filters";

const Listings = () => {
  const { getListings, authenticateUser, wishlist, setWishlist } =
    useContext(ListingContext);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [arr, setArr] = useState([]);

  const token = authenticateUser();
  //
  useEffect(() => {
    const fetchListing = async () => {
      const data = await getListings();
      setListings(data);
      setFilteredListings(data);
    };
    fetchListing();
  }, [getListings]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/userInfo`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "auth-token": `${token}`,
          },
        }
      );
      const data = await response.json();
      setWishlist(data.wishlist);
    };
    fetchUser();
  }, [token]);

  useEffect(() => {
    if (arr.length > 0) {
      setFilteredListings(
        listings.filter((listing) =>
          listing.type?.find((data) => arr.includes(data))
        )
      );
    } else {
      setFilteredListings(listings);
    }
  }, [arr]);
  console.log(wishlist);
  //
  return (
    <>
      <Filters arr={arr} setArr={setArr} />
      {/*  */}
      <div className="flex justify-evenly gap-4 p-4 flex-row flex-wrap my-8">
        {filteredListings.map((listing) => (
          <Cards
            data={listing}
            key={listing._id}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        ))}
      </div>
    </>
  );
};

export default Listings;
