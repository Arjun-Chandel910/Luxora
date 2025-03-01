import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListingState from "./context/listingState";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Divider from "@mui/material/Divider";
import Listings from "./components/listings/listings";
import SingleCard from "./components/listings/SingleCard";
function App() {
  return (
    <>
      <ListingState>
        <div className="flex flex-col min-h-screen relative">
          <BrowserRouter>
            <Navbar></Navbar>
            <Divider></Divider>
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Listings />} />
                <Route path="/card" element={<SingleCard />} />
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
