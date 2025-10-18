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
            const mockToken = "mock-jwt-token-" + Date.now();
            const mockUser = {
               id: "1",
               email: email,
               name: "Demo User"
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            localStorage.setItem("token", mockToken);
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
      setUser(null);
   };

   const register = async (email, password, name) => {
      try {
         setLoading(true);
         setError(null);

         // Mock registration for demo purposes
         // In a real app, this would be: const response = await fetch("/api/register", {...});
         if (email && password && name) {
            const mockToken = "mock-jwt-token-" + Date.now();
            const mockUser = {
               id: Date.now().toString(),
               email: email,
               name: name
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            localStorage.setItem("token", mockToken);
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
