import React, { useContext, useEffect, useState } from "react";

import Cards from "./Cards";
import ListingContext from "../../context/listingContext";
const Listings = () => {
  const { getListings } = useContext(ListingContext);

  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListing = async () => {
      const data = await getListings();
      setListings(data);
    };
    fetchListing();
  }, [getListings]);

  return (
    <>
      <div className="flex justify-evenly gap-4 p-4 flex-wrap">
        {listings.map((listing) => {
          return (
            <div className="w-1/5">
              {" "}
              {/* Ensures exactly 4 cards per row */}
              <Cards data={listing} key={listing._id} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Listings;
