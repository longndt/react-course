import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({ children, requiredRole }) {
   const { user, loading } = useAuth();
   const location = useLocation();

   if (loading) {
      return <div>Loading...</div>;
   }

   if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
   }

   return <>{children}</>;
}
