import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

const ReviewCard = ({ item }) => {
  return (
    <div className="w-[350px] h-[180px] bg-white shadow-lg rounded-2xl p-5 flex flex-col justify-between border border-gray-200">
      <div className="flex items-center gap-4">
        <img
          src={
            item.user.image?.url ||
            "https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="rounded-3xl w-10 h-10"
          alt=""
        />
        <h1 className="text-sm  text-gray-500 italic ">{item.user.name}</h1>
        <Rating name="read-only" value={item.rating} readOnly size="medium" />
      </div>
      <p className="text-gray-700 text-base overflow-hidden text-ellipsis line-clamp-4">
        {item.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
