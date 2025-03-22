import { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", form);
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-8 bg-white">
        <Typography
          variant="h4"
          className="text-zinc-500 text-center font-bold mb-4"
        >
          Welcome to Luxora
        </Typography>
        <Typography variant="body1" className="text-gray-600 text-center mb-6">
          Sign up to get started
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <TextField
              type="text"
              name="name"
              label="Full Name"
              variant="outlined"
              fullWidth
              value={form.name}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg"
            />
            <TextField
              type="email"
              name="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              value={form.email}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg"
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={form.password}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg "
            />
            <Button
              style={{ background: "#FF5A5F" }}
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              className="py-3 text-lg font-semibold shadow-md"
            >
              Sign Up
            </Button>
          </form>
          <h1 className="my-2">
            Already have an account :
            <Link to="/login" className="text-blue-500 mx-4">
              Login
            </Link>{" "}
          </h1>
        </CardContent>
      </Card>
    </Box>
  );
}
