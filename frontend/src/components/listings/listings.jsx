import React, { useContext, useEffect, useState } from "react";
import Cards from "./Cards";
import ListingContext from "../../context/listingContext";
import Filters from "./Filters";

const Listings = () => {
  const { getListings } = useContext(ListingContext);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [arr, setArr] = useState([]);
  const [wishlist, setWishlist] = useState([]);
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

      const response = await fetch(`http://localhost:3000/api/userInfo`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "auth-token": `${token}`,
        },
      });
      const data = await response.json();
      setWishlist(data.wishlist);
    };
    fetchUser();
  }, []);

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
  //
  return (
    <>
      <Filters arr={arr} setArr={setArr} />
      {/*  */}
      <div className="flex justify-evenly gap-4 p-4 flex-row flex-wrap my-8">
        {filteredListings.map((listing) => (
          <Cards data={listing} key={listing._id} wishlist={wishlist} />
        ))}
      </div>
    </>
  );
};

export default Listings;
