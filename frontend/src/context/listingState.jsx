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
  //update
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
  //delete
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

  //add
  const addListing = async (formData) => {
    const response = await fetch("http://localhost:3000/listing/add", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiOTQ4NThhMjI0YmE0OTMyN2U4YzMwIn0sImlhdCI6MTc0MTYxMzg2MX0.y17QyEDXgXXGIt5IqUgKfVTNfFA8NvV_BUu0f71sOOk",
      },
      body: formData,
    });
  };
  //review
  const getReviews = async (id) => {
    const response = await fetch(
      `http://localhost:3000/listing/${id}/allReviews`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  };

  //post a review
  const postReview = async (id, review) => {
    const response = await fetch(`http://localhost:3000/listing/${id}/review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiOTQ4NThhMjI0YmE0OTMyN2U4YzMwIn0sImlhdCI6MTc0MTYxMzg2MX0.y17QyEDXgXXGIt5IqUgKfVTNfFA8NvV_BUu0f71sOOk",
      },
      body: JSON.stringify({
        comment: review.comment,
        rating: review.rating,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <ListingContext.Provider
      value={{
        //listings
        getListings,
        getSingleListing,
        updateListing,
        deleteListing,
        addListing,
        //reviews
        getReviews,
        postReview,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export default ListingState;
