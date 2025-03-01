import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingContext from "../../context/listingContext";

const SingleCard = () => {
  let { id } = useParams();
  const { getSingleListing } = useContext(ListingContext);
  const [card, setCard] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const singleCard = await getSingleListing(id);
      if (singleCard) {
        setCard({
          title: singleCard.title,
          description: singleCard.description,
          price: singleCard.price,
          location: singleCard.location,
          country: singleCard.country,
        });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>{card.title}</h1>
      <h1>{card.description}</h1>
      <h1>{card.price}</h1>
      <h1>{card.location}</h1>
      <h1>{card.country}</h1>
    </div>
  );
};

export default SingleCard;
