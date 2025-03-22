import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("auth-token");
    console.log(token);
    localStorage.removeItem("auth-token");
    handleClose();
  };

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {/* profile and hamburger icon */}
        <div className="cursor-pointer flex p-2  my-3 mx-4 text-2xl  border-[2px] border-gray-600 rounded-2xl ">
          <MenuOutlinedIcon></MenuOutlinedIcon>
          <AccountCircleOutlinedIcon className=""></AccountCircleOutlinedIcon>
        </div>
        {/*  */}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/signup">Signup</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Link to="/">Logout</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
