import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      // Check for existing session
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");

      if (token && tokenExpiry) {
         const now = new Date().getTime();
         const expiry = parseInt(tokenExpiry);

         if (now < expiry) {
            fetchUser(token);
         } else {
            // Token expired, clear it
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiry");
            setLoading(false);
         }
      } else {
         setLoading(false);
      }
   }, []);

   const createTokenWithExpiry = (hours = 24) => {
      const now = new Date().getTime();
      const expiry = now + (hours * 60 * 60 * 1000); // Convert hours to milliseconds
      return {
         token: "mock-jwt-token-" + now,
         expiry: expiry.toString()
      };
   };

   const fetchUser = async (token) => {
      try {
         // Mock user data for demo purposes
         // In a real app, this would be: const response = await fetch("/api/user", {...});
         const mockUser = {
            id: "1",
            email: "demo@gmail.com",
            name: "Demo User"
         };

         // Simulate API delay
         await new Promise(resolve => setTimeout(resolve, 500));
         setUser(mockUser);
      } catch (err) {
         setError(err instanceof Error ? err : new Error("An error occurred"));
         localStorage.removeItem("token");
         localStorage.removeItem("tokenExpiry");
      } finally {
         setLoading(false);
      }
   };

   const login = async (email, password) => {
      try {
         setLoading(true);
         setError(null);

         // Mock authentication for demo purposes
         // In a real app, this would be: const response = await fetch("/api/login", {...});
         if (email === "demo@gmail.com" && password === "demo") {
            const { token, expiry } = createTokenWithExpiry(24); // 24 hours expiration
            const mockUser = {
               id: "1",
               email: email,
               name: "Demo User"
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            localStorage.setItem("token", token);
            localStorage.setItem("tokenExpiry", expiry);
            setUser(mockUser);
         } else {
            throw new Error("Invalid credentials. Use demo@gmail.com / demo");
         }
      } catch (err) {
         setError(err instanceof Error ? err : new Error("Login failed"));
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      setUser(null);
   };

   const register = async (email, password, name) => {
      try {
         setLoading(true);
         setError(null);

         // Mock registration for demo purposes
         // In a real app, this would be: const response = await fetch("/api/register", {...});
         if (email && password && name) {
            const { token, expiry } = createTokenWithExpiry(24); // 24 hours expiration
            const mockUser = {
               id: Date.now().toString(),
               email: email,
               name: name
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            localStorage.setItem("token", token);
            localStorage.setItem("tokenExpiry", expiry);
            setUser(mockUser);
         } else {
            throw new Error("All fields are required");
         }
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
