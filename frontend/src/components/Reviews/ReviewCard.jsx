import React from "react";
import Rating from "@mui/material/Rating";
const ReviewCard = ({ item }) => {
  return (
    <div className="flex flex-wrap justify-start items-start w-3/4 mx-auto gap-4 ">
      <div className="flex">
        {" "}
        <h1 className="text-3xl">jane doe</h1>
        <Rating name="read-only" value={item.rating} readOnly size="small" />
      </div>

      <h1 className="">{item.comment}</h1>
    </div>
  );
};

export default ReviewCard;
