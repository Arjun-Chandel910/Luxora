import { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });
    const data = await response.json();
    localStorage.setItem("auth-token", `${data.token}`);
    navigate("/");
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-50 p-2">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-8 bg-white">
        <Typography
          variant="h4"
          className="text-zinc-500 text-center font-bold mb-4"
        >
          Welcome Back
        </Typography>
        <Typography variant="body1" className="text-gray-600 text-center mb-6">
          Log in to your account
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
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
              className="bg-gray-100 rounded-lg"
            />
            <Button
              style={{ background: "#FF5A5F" }}
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              className="py-3 text-lg font-semibold shadow-md"
            >
              Log In
            </Button>
          </form>
          <h1 className="my-2">
            Create an account :
            <Link to="/signup" className="text-blue-500 mx-4">
              Signup
            </Link>{" "}
          </h1>
        </CardContent>
      </Card>
    </Box>
  );
}
