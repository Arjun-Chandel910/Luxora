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
    image: "",
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
          image: singleCard.image,
        });
      }
    };
    fetchData();
    console.log("data");
  }, []);
  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-[800px] mx-auto">
      <h1 className="text-2xl">{card.title}</h1>

      <img
        src={card.image}
        alt={card.title}
        className="w-[200px] h-40 sm:w-[300px] sm:h-64 object-cover rounded-2xl"
      />

      <h1>{card.description}</h1>
      <h1>&#8377; {card.price}</h1>
      <h1>{card.location}</h1>
      <h1>{card.country}</h1>
    </div>
  );
};

export default SingleCard;
