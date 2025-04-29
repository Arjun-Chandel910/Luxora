import { useContext, useState } from "react";
import ListingContext from "./listingContext";
import FlashContext from "./FlashContext";
const ListingState = ({ children }) => {
  const { showFlash } = useContext(FlashContext);
  const [wishlist, setWishlist] = useState([]);

  //listing methods

  //seach listings based on location
  const searchListings = async (location) => {
    try {
      console.log(location);
      const response = await fetch(
        `http://localhost:3000/listing/s?search=${location}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  //get all listings
  const authenticateUser = () => {
    const token = localStorage.getItem("auth-token");
    return token;
  };

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
    try {
      const token = localStorage.getItem("auth-token");
      console.log(token);
      if (!token) {
        console.log("Unauthorized: No token");
        return;
      }
      const response = await fetch(`http://localhost:3000/listing/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          title: card.title,

          description: card.description,
          price: card.price,
          country: card.country,
          location: card.location,
        }),
      });
      const data = await response.json();
      showFlash({ success: data.success, message: data.message });
    } catch (error) {
      console.error("Network Error:", error);
      showFlash({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    }
  };
  //delete a listings
  const deleteListing = async (id) => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token" });
      }
      const response = fetch(`http://localhost:3000/listing/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "auth-token": `${token}`,
        },
      });
      showFlash({ success: true, message: "Listing deleted!" });
    } catch (err) {
      showFlash({
        success: false,
        message: err,
      });
    }
  };

  //add a listing
  const addListing = async (formData) => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token" });
      }
      const response = await fetch("http://localhost:3000/listing/add", {
        method: "POST",
        headers: {
          "auth-token": `${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      showFlash({ success: data.success, message: data.message });
    } catch (err) {
      showFlash({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    }
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
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token" });
      }
      const response = await fetch(
        `http://localhost:3000/listing/${id}/review`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "auth-token": `${token}`,
          },
          body: JSON.stringify({
            comment: review.comment,
            rating: review.rating,
          }),
        }
      );
      showFlash({ success: true, message: "Review posted!" });
    } catch (err) {
      showFlash({ success: false, message: "Something went wrong!" });
    }
  };

  return (
    <ListingContext.Provider
      value={{
        //listings
        wishlist,
        setWishlist,
        searchListings,
        getListings,
        getSingleListing,
        updateListing,
        deleteListing,
        addListing,
        //reviews
        getReviews,
        postReview,
        authenticateUser,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export default ListingState;
