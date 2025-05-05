import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Divider from "@mui/material/Divider";

// providers
import ListingState from "./context/listingState";
import FlashState from "./context/FlashState";

// layouts
const Navbar = lazy(() => import("./layout/Navbar"));
const Footer = lazy(() => import("./layout/Footer"));

// auth
const Signup = lazy(() => import("./components/auth/Signup"));
const Login = lazy(() => import("./components/auth/Login"));

// components
const Listings = lazy(() => import("./components/listings/ListingsTemp"));
const SingleCard = lazy(() => import("./components/listings/SingleCard"));
const EditForm = lazy(() => import("./components/listings/EditForm"));
const AddListing = lazy(() => import("./components/listings/AddListing"));
const ProtectedRoute = lazy(() =>
  import("./components/listings/ProtectedRoute")
);
const Profile = lazy(() => import("./components/profile/Profile"));
const FlashMsg = lazy(() => import("./components/flash/FlashMsg"));
const SearchedCard = lazy(() =>
  import("./components/listings/SearchedCardTemp")
);

// wishlist
const Wishlist = lazy(() => import("./components/wishlist/Wishlist"));

function App() {
  return (
    <>
      <FlashState>
        <ListingState>
          <div className="flex flex-col min-h-screen relative">
            <BrowserRouter>
              <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
                <Divider />

                <div className="flex-grow lg:mt-24 mt-50">
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
                <Footer />
              </Suspense>
            </BrowserRouter>
          </div>
        </ListingState>
      </FlashState>
    </>
  );
}

export default App;
