import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function ProtectedRoute({ children, requiredRole }) {
   const { user, loading } = useAuth();
   const location = useLocation();

   if (loading) {
      return <LoadingSpinner text="Loading..." />;
   }

   if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
   }

   return <>{children}</>;
}
