import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListingContext from "../../context/listingContext";
import Button from "@mui/material/Button";
import LuxoraMap from "../maps/LuxoraMap";
import DeleteModal from "../../Modals/DeleteModal";
import CalenderModal from "../../Modals/CalenderModal";
import Reviews from "../Reviews/Reviews";
import Divider from "@mui/material/Divider";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

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
  const [token, setToken] = useState();
  const [isOwner, setIsOwner] = useState(false);

  const checkOwner = async (listing) => {
    const token = authenticateUser();
    if (!token) return;
    const decoded = jwtDecode(token);
    return listing.user === decoded.user.id;
  };

  useEffect(() => {
    const fetchData = async () => {
      setToken(authenticateUser());
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
      <div className="min-h-screen flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto gap-6 p-6 bg-white text-gray-900 shadow-md rounded-xl ">
        <h1 className="text-2xl font-bold text-red-500">{card.title}</h1>
        <img
          src={card.image.url}
          alt={card.title}
          className="w-[95%] sm:w-[600px] h-[180px] sm:h-[200px] object-cover rounded-xl shadow-md"
        />
        <h1 className="text-base text-gray-700 italic">{card.description}</h1>
        <h1 className="text-xl font-semibold text-red-500">
          {" "}
          &#8377; {card.price}/ <span className="italic text-lg ">night </span>
        </h1>
        <h1 className="text-base text-gray-600">
          {card.location}, {card.country}
        </h1>

        <div>
          <CalenderModal id={id} token={token} />
        </div>

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

      <br />
      <br />
      <Divider className="border-gray-300" />
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
