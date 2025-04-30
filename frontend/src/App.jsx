import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Divider from "@mui/material/Divider";
// providers
import ListingState from "./context/listingState";
import FlashState from "./context/FlashState";

//layouts
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

//auth
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

// components
import Listings from "./components/listings/ListingsTemp";
import SingleCard from "./components/listings/SingleCard";
import EditForm from "./components/listings/EditForm";
import AddListing from "./components/listings/AddListing";
import ProtectedRoute from "./components/listings/ProtectedRoute";
import { Profile } from "./components/profile/Profile";
import FlashMsg from "./components/flash/FlashMsg";
import SearchedCard from "./components/listings/searchedCard";
//wishlist
import Wishlist from "./components/wishlist/Wishlist";
function App() {
  return (
    <>
      <FlashState>
        <ListingState>
          <div className="flex flex-col min-h-screen relative">
            <BrowserRouter>
              <Navbar />
              <Divider />

              <div className="flex-grow mt-24 ">
                <FlashMsg />
                <Routes>
                  <Route path="/" element={<Listings />} />

                  <Route path="/:id" element={<SingleCard />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/s" element={<SearchedCard />} />
                  <Route path="/login" element={<Login />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/wishes" element={<Wishlist />} />
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
      </FlashState>
    </>
  );
}
export default App;
