import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ListingContext from "../../context/listingContext";
import Cards from "./Cards";

const SearchedCard = () => {
  const { searchListings } = useContext(ListingContext);
  const location = useLocation();
  const QueryParam = new URLSearchParams(location.search);
  const searchQuery = QueryParam.get("location");
  const [listings, setListings] = useState([]);
  useEffect(() => {
    async function fetchListings() {
      const data = await searchListings(searchQuery);
      setListings(data);
    }
    fetchListings();
  }, [searchQuery, searchListings]);
  return (
    <div className="flex justify-evenly gap-4 p-4 flex-row  flex-wrap my-8">
      {listings.map((listing) => {
        return <Cards data={listing} key={listing._id} />;
      })}
    </div>
  );
};
export default SearchedCard;
