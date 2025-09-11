import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      // Check for existing session
      const token = localStorage.getItem("token");
      if (token) {
         fetchUser(token);
      } else {
         setLoading(false);
      }
   }, []);

   const fetchUser = async (token) => {
      try {
         const response = await fetch("/api/user", {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         if (!response.ok) {
            throw new Error("Failed to fetch user");
         }

         const userData = await response.json();
         setUser(userData);
      } catch (err) {
         setError(err instanceof Error ? err : new Error("An error occurred"));
         localStorage.removeItem("token");
      } finally {
         setLoading(false);
      }
   };

   const login = async (email, password) => {
      try {
         setLoading(true);
         setError(null);

         const response = await fetch("/api/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
         });

         if (!response.ok) {
            throw new Error("Invalid credentials");
         }

         const { token, user: userData } = await response.json();

         localStorage.setItem("token", token);
         setUser(userData);
      } catch (err) {
         setError(err instanceof Error ? err : new Error("Login failed"));
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
   };

   const register = async (email, password, name) => {
      try {
         setLoading(true);
         setError(null);

         const response = await fetch("/api/register", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name }),
         });

         if (!response.ok) {
            throw new Error("Registration failed");
         }

         const { token, user: userData } = await response.json();

         localStorage.setItem("token", token);
         setUser(userData);
      } catch (err) {
         setError(err instanceof Error ? err : new Error("Registration failed"));
         throw err;
      } finally {
         setLoading(false);
      }
   };

   return (
      <AuthContext.Provider
         value={{ user, loading, error, login, logout, register }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
}
