import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Testing = () => {
  //   const [data, setData] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=delhi`
    );
    const data = await response.json();
    console.log("lon" + data[0].lon);
    console.log("lat" + data[0].lat);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Contained
        </Button>
      </form>
      <h1>hi how are you</h1>
    </div>
  );
};

export default Testing;
