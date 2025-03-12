import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import ListingContext from "../context/listingContext";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "24px",
  boxShadow: 24,
  p: 4,
};

export default function AddReviewModal({ id }) {
  const navigate = useNavigate();
  const { postReview } = React.useContext(ListingContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [review, setReview] = React.useState({
    comment: "",
    rating: 2,
  });
  const handleInput = (e) => {
    setReview((r) => {
      return { ...r, [e.target.name]: e.target.value };
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    postReview(id, review);
    navigate(`/${id}`);
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Add Review</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form action="" onSubmit={handleForm}>
            {" "}
            <TextField
              required
              id="standard-basic"
              label="Review"
              variant="standard"
              name="comment"
              value={review.comment}
              onChange={handleInput}
            />
            <div className="flex gap-2 justify-between my-2">
              <Rating
                name="simple-controlled"
                size="large"
                value={review.rating}
                onChange={(event, newValue) => {
                  setReview((prev) => ({ ...prev, rating: newValue }));
                }}
              />
              <Button
                size="small"
                sx={{
                  color: "white",
                  backgroundColor: "#FF5A5F",
                }}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
