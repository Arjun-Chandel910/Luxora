import React, { useContext, useEffect, useState } from "react";
import ListingContext from "../../context/listingContext";
import ReviewCard from "./ReviewCard";
import ReviewModal from "../../Modals/AddReviewModal";

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
      <div className="w-full ">
        <ReviewModal id={id} fetchReview={fetchReview}></ReviewModal>
      </div>
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
