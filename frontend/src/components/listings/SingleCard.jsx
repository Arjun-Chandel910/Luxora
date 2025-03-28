import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListingContext from "../../context/listingContext";
import Button from "@mui/material/Button";
import LuxoraMap from "../maps/LuxoraMap";
import DeleteModal from "../../util/DeleteModal";
import Reviews from "../Reviews/Reviews";
import Divider from "@mui/material/Divider";
import { jwtDecode } from "jwt-decode";

const SingleCard = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const { getSingleListing, deleteListing, authenticateUser } =
    useContext(ListingContext);
  const [card, setCard] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    image: "",
  });
  const [isOwner, setIsOwner] = useState(false);

  const checkOwner = async (listing) => {
    const token = authenticateUser();
    if (!token) return;
    const decoded = jwtDecode(token);
    return listing.user === decoded.user.id;
  };

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
        const check = await checkOwner(singleCard);
        setIsOwner(check);
      }
    };
    fetchData();
  }, [id, getSingleListing]);

  const handleDelete = async () => {
    deleteListing(id);
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-center w-full max-w-2xl mx-auto gap-6 p-6 bg-white text-gray-900 shadow-md rounded-xl border border-gray-300 mt-8">
        <h1 className="text-2xl font-bold text-red-500">{card.title}</h1>
        <img
          src={card.image.url}
          alt={card.title}
          className="w-[85%] sm:w-[450px] h-[250px] sm:h-[320px] object-cover rounded-xl shadow-md border border-gray-300"
        />
        <h1 className="text-base text-gray-700 italic">{card.description}</h1>
        <h1 className="text-xl font-semibold text-red-500">
          &#8377; {card.price}
        </h1>
        <h1 className="text-base text-gray-600">
          {card.location}, {card.country}
        </h1>

        {isOwner && (
          <div className="flex gap-3 mt-3">
            <Button
              variant="contained"
              size="small"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => navigate(`/${id}/edit`)}
            >
              Edit
            </Button>
            <DeleteModal id={id} handleDelete={handleDelete}></DeleteModal>
          </div>
        )}
      </div>

      <LuxoraMap card={card}></LuxoraMap>
      <br />
      <br />
      <Divider className="border-gray-300" />
      <br />
      <br />
      <Reviews id={id}></Reviews>
    </>
  );
};

export default SingleCard;
