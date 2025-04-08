import React, { useContext, useEffect, useState } from "react";
import ListingContext from "../../context/listingContext";
import ReviewCard from "./ReviewCard";
import Divider from "@mui/material/Divider";
import ReviewModal from "../../util/AddReviewModal";

const Reviews = ({ id }) => {
  const { getReviews } = useContext(ListingContext);

  const [reviews, setReviews] = useState([]);
  const fetchReview = async () => {
    const rev = await getReviews(id);
    setReviews(rev);
  };

  useEffect(() => {
    fetchReview();
  }, [id]);
  return (
    <div className="flex flex-wrap justify-start items-start w-3/4 mx-auto gap-4 ">
      <ReviewModal id={id} fetchReview={fetchReview}></ReviewModal>
      <br />
      <br />
      {reviews.map((item) => {
        return (
          <div key={item.id || item._id}>
            <ReviewCard item={item}></ReviewCard>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
