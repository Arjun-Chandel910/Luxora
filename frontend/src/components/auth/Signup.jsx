import { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    localStorage.setItem("auth-token", data.token);
    console.log(data.token);
    navigate("/");
  };

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
          <form onSubmit={handleSubmit}>
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
