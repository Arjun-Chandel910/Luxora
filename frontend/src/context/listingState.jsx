import ListingContext from "./listingContext";
const ListingState = ({ children }) => {
  //listing methods
  //get all listings
  const getListings = async () => {
    const response = await fetch("http://localhost:3000/listing/all", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  //get a listing
  const getSingleListing = async (id) => {
    const response = await fetch(`http://localhost:3000/listing/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  const updateListing = async (id, card) => {
    const response = await fetch(`http://localhost:3000/listing/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiOTQ4NThhMjI0YmE0OTMyN2U4YzMwIn0sImlhdCI6MTc0MTYxMzg2MX0.y17QyEDXgXXGIt5IqUgKfVTNfFA8NvV_BUu0f71sOOk",
      },
      body: JSON.stringify({
        title: card.title,
        description: card.description,
        price: card.price,
        country: card.country,
        location: card.location,
      }),
    });
  };
  const deleteListing = async (id) => {
    const response = fetch(`http://localhost:3000/listing/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiOTQ4NThhMjI0YmE0OTMyN2U4YzMwIn0sImlhdCI6MTc0MTYxMzg2MX0.y17QyEDXgXXGIt5IqUgKfVTNfFA8NvV_BUu0f71sOOk",
      },
    });
  };
  const addListing = async (card) => {
    const response = await fetch("http://localhost:3000/listing/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiOTQ4NThhMjI0YmE0OTMyN2U4YzMwIn0sImlhdCI6MTc0MTYxMzg2MX0.y17QyEDXgXXGIt5IqUgKfVTNfFA8NvV_BUu0f71sOOk",
      },
      body: JSON.stringify({
        title: card.title,
        description: card.description,
        price: card.price,
        country: card.country,
        location: card.location,
      }),
    });
  };

  return (
    <ListingContext.Provider
      value={{
        getListings,
        getSingleListing,
        updateListing,
        deleteListing,
        addListing,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export default ListingState;
