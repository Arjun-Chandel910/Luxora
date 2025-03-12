import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListingContext from "../../context/listingContext";
import { AddReview } from "../Reviews/AddReview";
import Button from "@mui/material/Button";

import DeleteModal from "../../util/DeleteModal";
import Reviews from "../Reviews/Reviews";
const SingleCard = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const { getSingleListing, deleteListing } = useContext(ListingContext);
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
  }, [id, getSingleListing]);

  const handleDelete = async () => {
    deleteListing(id);
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center w-full h-auto max-w-[800px] mx-auto gap-4 mb-4">
        <h1 className="text-2xl">{card.title}</h1>

        <img
          src={card.image}
          alt={card.title}
          className="w-[200px] h-40 sm:w-[300px] sm:h-64 object-cover rounded-2xl"
        />

        <h1 className="text-xl ">{card.description}</h1>
        <h1 className="text-lg">&#8377; {card.price}</h1>
        <h1 className="text-lg">{card.location}</h1>
        <h1 className="text-lg">{card.country}</h1>

        {/* button div */}
        <div className="flex gap-4">
          {/* edit button */}

          <Button
            variant="contained"
            size="small"
            onClick={() => {
              return navigate(`/${id}/edit`);
            }}
          >
            Edit
          </Button>

          {/* delete button  */}

          <DeleteModal id={id} handleDelete={handleDelete}></DeleteModal>
        </div>
      </div>
      <AddReview></AddReview>
      <Reviews id={id}></Reviews>
    </>
  );
};

export default SingleCard;
