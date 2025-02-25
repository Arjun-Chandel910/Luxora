import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListingState from "./context/listingState";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

function App() {
  return (
    <>
      <ListingState>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/">
              {/* <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </ListingState>
    </>
  );
}
export default App;
