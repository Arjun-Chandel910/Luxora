import React, { useContext, useEffect, useState } from "react";
import Cards from "./Cards";
import ListingContext from "../../context/listingContext";
import Filters from "./filters";

const Listings = () => {
  const { getListings } = useContext(ListingContext);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [arr, setArr] = useState([]);
  //
  useEffect(() => {
    const fetchListing = async () => {
      const data = await getListings();
      setListings(data);
      setFilteredListings(data);
    };
    fetchListing();
  }, [getListings]);
  //
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
          <Cards data={listing} key={listing._id} />
        ))}
      </div>
    </>
  );
};

export default Listings;
