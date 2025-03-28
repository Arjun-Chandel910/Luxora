import React from "react";
import Rating from "@mui/material/Rating";

const ReviewCard = ({ item }) => {
  return (
    <div className="w-[350px] h-[220px] bg-white shadow-lg rounded-2xl p-5 flex flex-col justify-between border border-gray-200">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-900">Jane Doe</h1>
        <Rating name="read-only" value={item.rating} readOnly size="medium" />
      </div>
      <p className="text-gray-700 text-base mt-3 overflow-hidden text-ellipsis line-clamp-4">
        {item.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
