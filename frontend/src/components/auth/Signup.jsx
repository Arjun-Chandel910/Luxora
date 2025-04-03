import { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const form = new FormData();
    form.append("image", formData.image);
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);

    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    localStorage.setItem("auth-token", data.token);
    console.log(data.token);
    navigate("/");
  };

  console.log(formData);
  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-50 px-6">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl p-10 bg-white">
        <Typography
          variant="h4"
          className="text-zinc-500 text-center font-bold mb-6"
        >
          Welcome to Luxora
        </Typography>
        <Typography variant="body1" className="text-gray-600 text-center mb-8">
          Sign up to get started
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="m-auto bg-zinc-400 border rounded-full border-zinc-600 mb-4 w-32 h-32 flex items-center justify-center overflow-hidden relative">
              <input
                type="file"
                // className="absolute inset-0 opacity-0 cursor-pointer"
                required
                name="image"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
            </div>

            <div className="mb-4">
              <TextField
                type="text"
                name="name"
                label="Full Name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-100 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <TextField
                type="email"
                name="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-100 rounded-lg"
                autoComplete="off"
              />
            </div>
            <div className="mb-6">
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-100 rounded-lg"
                autoComplete="off"
              />
            </div>
            <Button
              style={{ background: "#FF5A5F" }}
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              className="py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Sign Up
            </Button>
          </form>
          <h1 className="text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-blue-500 ml-2 hover:underline">
              Login
            </Link>
          </h1>
        </CardContent>
      </Card>
    </Box>
  );
}
