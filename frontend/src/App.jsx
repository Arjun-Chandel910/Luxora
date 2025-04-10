import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListingState from "./context/listingState";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Divider from "@mui/material/Divider";
import Listings from "./components/listings/Listings";
import SingleCard from "./components/listings/SingleCard";
import EditForm from "./components/listings/EditForm";
import AddListing from "./components/listings/AddListing";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/listings/ProtectedRoute";
import { Profile } from "./components/profile/Profile";
import Calender from "./components/booking/Calender";
function App() {
  return (
    <>
      <ListingState>
        <div className="flex flex-col min-h-screen relative">
          <BrowserRouter>
            <Navbar></Navbar>
            <Divider></Divider>
            <div className="flex-grow mt-18">
              <Routes>
                <Route path="/" element={<Listings />} />

                <Route path="/:id" element={<SingleCard />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/booking" element={<Calender />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/add" element={<AddListing />} />
                  <Route path="/:id/edit" element={<EditForm />} />
                </Route>
              </Routes>
            </div>
            <Footer></Footer>
          </BrowserRouter>
        </div>
      </ListingState>
    </>
  );
}
export default App;
