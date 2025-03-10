import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListingState from "./context/listingState";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Divider from "@mui/material/Divider";
import Listings from "./components/listings/listings";
import SingleCard from "./components/listings/SingleCard";
import EditForm from "./components/listings/EditForm";
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
                <Route path="/:id" element={<SingleCard />} />
                <Route path="/:id/edit" element={<EditForm />} />
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
