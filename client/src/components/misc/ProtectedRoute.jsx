import { Navigate } from "react-router-dom";
import  AuthContext  from '../../context/AuthContext';
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext)

  if (isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;