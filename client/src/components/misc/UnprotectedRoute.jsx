import { Navigate } from "react-router-dom";
import { useAuthContext } from '../../context/AuthContext_NO';

const UnprotectedRoute = ({ children }) => {
  const { user, isAuthFetched } = useAuthContext()

  if (isAuthFetched && user) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default UnprotectedRoute