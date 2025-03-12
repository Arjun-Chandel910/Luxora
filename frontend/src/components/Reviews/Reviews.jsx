import React, { useContext, useEffect, useState } from "react";
import ListingContext from "../../context/listingContext";
import ReviewCard from "./ReviewCard";
import Divider from "@mui/material/Divider";

const Reviews = ({ id }) => {
  const { getReviews } = useContext(ListingContext);

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReview = async () => {
      const rev = await getReviews(id);
      setReviews(rev);
    };
    fetchReview();
  }, [getReviews]);
  return (
    <div className="flex flex-wrap justify-start items-start w-3/4 mx-auto gap-4 ">
      {reviews.map((item) => {
        return (
          <div key={item.id || item._id}>
            <ReviewCard item={item}></ReviewCard>
            <Divider className="!mt-4 !w-full !border-gray-300" />
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
