import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import ListingContext from "../../context/listingContext";
const EditForm = () => {
  const navigate = useNavigate();
  const { getSingleListing, updateListing } = useContext(ListingContext);
  const { id } = useParams();

  const [card, setCard] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    // image: "",
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
          // image: singleCard.image,
        });
      }
    };
    fetchData();
  }, []);

  const handleInput = (e) => {
    setCard((d) => {
      return { ...d, [e.target.name]: e.target.value };
    });
  };
  const handleForm = (e) => {
    e.preventDefault();
    updateListing(id, card);
    navigate(`/${id}`);
  };

  return (
    <>
      <div className="flex flex-col  w-1/3 sm:w-1/2 mx-auto ">
        <h1 className="text-3xl  mb-4">Edit Listing</h1>
        <form
          action=""
          className="flex gap-4  flex-col mt-4 "
          onSubmit={handleForm}
        >
          <TextField
            name="title"
            onChange={handleInput}
            required
            id="outlined-basic"
            label="Title"
            variant="outlined"
            slotprops={{
              inputLabel: {
                shrink: true,
              },
            }}
            value={card.title}
          />
          <TextField
            name="description"
            onChange={handleInput}
            required
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            value={card.description}
            slotprops={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          {/* 
          <input
            required
            id="outlined-multiline-flexible"
            label="Image"
            type="file"
            accept="image/*"
            value={card.image}
            slotprops={{
              inputLabel: {
                shrink: true,
              },
            }}
            className="w-40 h-12 px-4 border
             border-gray-300 rounded-full 
             focus:outline-none focus:ring-2
              focus:ring-blue-500"
          /> */}
          <TextField
            name="price"
            onChange={handleInput}
            required
            value={card.price}
            id="outlined-number"
            label="Price"
            type="number"
            slotprops={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <div className="sm:flex  sm:gap-2 w-full justify-between">
            {" "}
            <TextField
              name="country"
              onChange={handleInput}
              required
              value={card.country}
              id="filled-basic"
              label="Country"
              variant="filled"
              className="rounded-4xl w-full sm:w-1/2"
              slotprops={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              name="location"
              onChange={handleInput}
              required
              value={card.location}
              id="filled-basic"
              label="Location"
              variant="filled"
              slotprops={{
                inputLabel: {
                  shrink: true,
                },
              }}
              className="rounded-4xl w-full sm:w-1/2 "
            />
            <Button variant="contained" endIcon={<SendIcon />} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
