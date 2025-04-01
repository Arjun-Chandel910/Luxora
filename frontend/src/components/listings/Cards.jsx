import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Cards({ data }) {
  const listing = data;

  return (
    <Link to={`/${listing._id}`} className="no-underline">
      <Card
        sx={{
          width: 350,
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "20px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          },
        }}
        className="mx-6 my-4"
      >
        <div
          style={{
            width: "100%",
            height: 200,
            overflow: "hidden",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        >
          <CardMedia
            component="img"
            alt={listing.image.filename}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            image={listing.image.url}
          />
        </div>

        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          className="p-4"
        >
          <div>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="font-semibold"
            >
              {listing.title}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              {listing.location}
            </Typography>
          </div>

          <Typography
            variant="h6"
            className="mt-2 text-lg font-bold text-gray-900"
          >
            ₹ {listing.price} / night
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
