import React from "react";
import ReviewModal from "../../util/AddReviewModal";
import { useParams } from "react-router-dom";
export const AddReview = () => {
  const { id } = useParams();
  return (
    <div>
      <h2 className="text-2xl text-center">Reviews</h2>

      <ReviewModal id={id}></ReviewModal>
    </div>
  );
};
