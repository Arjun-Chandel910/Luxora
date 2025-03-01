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
      <div className="flex justify-evenly gap-4 p-4 flex-row  flex-wrap my-8">
        {listings.map((listing) => {
          return <Cards data={listing} key={listing._id} />;
        })}
      </div>
    </>
  );
};

export default Listings;
