import React from "react";
// Icons
import CopyrightIcon from "@mui/icons-material/Copyright";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Divider />
      <div className="relative inset-x-0 bottom-0 h-16 flex justify-between p-2 bg-zinc-100">
        <div className="flex items-center">
          <CopyrightIcon className="mr-1" />
          <span>2025 Luxora, Inc.</span>
        </div>
        <div className="flex gap-4">
          <Link
            to="https://www.instagram.com/arjun_chandel_9/"
            className="hover:text-blue-500"
          >
            <InstagramIcon />
          </Link>
          <Link
            to="https://x.com/ArjunChand66194"
            className="hover:text-blue-500"
          >
            <XIcon />
          </Link>
          <Link
            to="https://www.facebook.com/profile.php?id=61550573695472"
            className="hover:text-blue-500"
          >
            <FacebookIcon />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
