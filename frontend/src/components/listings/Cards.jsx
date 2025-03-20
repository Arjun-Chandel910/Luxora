import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Cards({ data }) {
  const listing = data;
  return (
    <Card
      sx={{ maxWidth: 300, maxHeight: 300 }}
      className="mx-8 my-4 rounded-4xl"
    >
      <Link to={{ pathname: `/${listing._id}` }}>
        <CardMedia
          component="img"
          alt="green iguana"
          className="h-1/2"
          image={`${listing.image.url}`}
        />
        <CardContent className="flex flex-col flex-grow">
          <Typography gutterBottom variant="h7" component="div">
            {listing.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            &#8377; {listing.price}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {listing.location}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
