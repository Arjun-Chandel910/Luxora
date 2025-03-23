import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import ListingContext from "../../context/listingContext";

const ProtectedRoute = () => {
  const { authenticateUser } = useContext(ListingContext);
  const token = authenticateUser();

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
