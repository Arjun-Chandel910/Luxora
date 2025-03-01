import ListingContext from "./listingContext";
const ListingState = ({ children }) => {
  const getListings = async () => {
    const response = await fetch("http://localhost:3000/listing/all", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  const getSingleListing = async (id) => {
    const response = await fetch(`http://localhost:3000/listing/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  return (
    <ListingContext.Provider value={{ getListings, getSingleListing }}>
      {children}
    </ListingContext.Provider>
  );
};

export default ListingState;
