import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link, useNavigate } from "react-router-dom";
import ListingContext from "../context/listingContext";

export default function BasicMenu() {
  const navigate = useNavigate();
  const { authenticateUser, setWishlist } = React.useContext(ListingContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    handleClose();
    authenticateUser();
    setWishlist([]);
    navigate("/");
  };
  let [token, setToken] = React.useState();
  React.useEffect(() => {
    setToken(authenticateUser());
  });

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full shadow-sm bg-white hover:shadow-md transition-all duration-300"
      >
        <MenuOutlinedIcon sx={{ color: "#222", fontSize: 24 }} />
        <AccountCircleOutlinedIcon sx={{ color: "#555", fontSize: 28 }} />
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
        className="mt-2"
      >
        {token ? (
          <div>
            <Link to="profile">
              {" "}
              <MenuItem
                onClick={handleClose}
                className="hover:bg-gray-100 px-6 py-3"
              >
                Profile
              </MenuItem>
            </Link>

            <MenuItem
              onClick={handleLogout}
              className="hover:bg-gray-100 px-6 py-3 text-red-500"
            >
              Logout
            </MenuItem>
          </div>
        ) : (
          <div>
            {" "}
            <MenuItem
              onClick={handleClose}
              className="hover:bg-gray-100 px-6 py-3"
            >
              <Link to="/signup" className="text-gray-800">
                Signup
              </Link>
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              className="hover:bg-gray-100 px-6 py-3"
            >
              <Link to="/login" className="text-gray-800">
                Login{" "}
              </Link>
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
}
