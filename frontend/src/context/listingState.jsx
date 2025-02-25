import ListingContext from "./listingContext"; // Ensure correct import

const ListingState = ({ children }) => {
  const obj = {
    name: "arjun",
  };

  return (
    <ListingContext.Provider value={{ obj }}>
      {children}
    </ListingContext.Provider>
  );
};

export default ListingState;
