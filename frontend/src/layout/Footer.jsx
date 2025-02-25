import React from "react";
//icons
import CopyrightIcon from "@mui/icons-material/Copyright";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
const Footer = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 h-16 flex justify-between border-t-1 p-2 bg-zinc-100">
      <div>
        <CopyrightIcon></CopyrightIcon> 2025 Luxora , Inc.
      </div>
      <div className="flex gap-2">
        <InstagramIcon></InstagramIcon>
        <XIcon></XIcon>
        <FacebookIcon></FacebookIcon>
      </div>
    </div>
  );
};

export default Footer;
