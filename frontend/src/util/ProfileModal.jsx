import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "auto",
  background: "gray",
  boxShadow: 24,
};

export default function ProfileModal({ item }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <img
          src={
            item.user.image?.url ||
            "https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="rounded-full w-10 h-10  border-4 border-zinc-300"
          alt=""
        />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          borderRadius: "auto",
        }}
      >
        <Box sx={style}>
          <img
            src={
              item.user.image?.url ||
              "https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            className="rounded-full w-100 h-100"
            alt=""
          />
        </Box>
      </Modal>
    </div>
  );
}
