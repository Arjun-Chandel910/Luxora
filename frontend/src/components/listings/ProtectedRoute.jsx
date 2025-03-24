import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import ListingContext from "../../context/listingContext";

const ProtectedRoute = () => {
  const { authenticateUser } = useContext(ListingContext);
  const token = authenticateUser();
  //outlet gets replaced by the child components
  return token ? <Outlet /> : <Navigate to="/login" replace />;
  //replace help to not save
  // the page in the browser history
};

export default ProtectedRoute;
