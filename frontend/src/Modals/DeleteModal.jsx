import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ id, handleDelete }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNo = () => {
    navigate(`/${id}`);
    setOpen(false);
  };
  const handleYes = () => {
    handleDelete(id);
    navigate("/");
  };
  return (
    <div>
      <Tooltip title="Delete" onClick={handleOpen}>
        <IconButton>
          <DeleteIcon className="text-rose-700" />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete the Listing.
          </Typography>
          <div className="flex gap-4 mt-4">
            {" "}
            <Button variant="outlined" size="small" onClick={handleYes}>
              Yes
            </Button>
            <Button variant="outlined" size="small" onClick={handleNo}>
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
