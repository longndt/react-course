import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface ProtectedRouteProps {
   children: ReactNode;
   requiredRole?: string;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
   const { user, loading } = useAuth();
   const location = useLocation();

   if (loading) {
      return <LoadingSpinner text="Loading..." />;
   }

   if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   if (requiredRole && (user as any).role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
   }

   return <>{children}</>;
}
