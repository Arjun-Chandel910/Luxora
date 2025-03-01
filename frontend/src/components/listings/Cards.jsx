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
    <Card sx={{ maxWidth: 300, maxHeight: 300 }} className="my-4">
      <CardMedia
        component="img"
        alt="green iguana"
        className="h-1/2"
        image={`${listing.image}`}
      />
      <CardContent className="flex flex-col flex-grow">
        <Typography gutterBottom variant="h5" component="div">
          {listing.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {listing.description}
        </Typography>

        <Link to={{ pathname: "/card" }}>
          {" "}
          <Button variant="contained">Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
