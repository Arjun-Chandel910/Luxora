import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import ProfileModal from "../../Modals/ProfileModal";

const ReviewCard = ({ item }) => {
  return (
    <div className="w-[350px] h-[180px] bg-white shadow-lg rounded-2xl p-5 flex flex-col justify-between border border-gray-200">
      <div className="flex items-center gap-4">
        <ProfileModal item={item}></ProfileModal>
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
