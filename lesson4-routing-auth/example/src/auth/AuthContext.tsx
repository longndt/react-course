import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
   id: string;
   email: string;
   name: string;
}

interface AuthContextType {
   user: User | null;
   loading: boolean;
   error: Error | null;
   login: (email: string, password: string) => Promise<void>;
   logout: () => void;
   register: (email: string, password: string, name: string) => Promise<void>;
}

interface AuthProviderProps {
   children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      // Check for existing session
      const token = localStorage.getItem("token");
      if (token) {
         fetchUser(token);
      } else {
         setLoading(false);
      }
   }, []);

   const fetchUser = async (_token: string) => {
      // token parameter is for future API integration
      try {
         // Mock user data for demo purposes
         // In a real app, this would be: const response = await fetch("/api/user", {...});
         const mockUser: User = {
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

   const login = async (email: string, password: string) => {
      try {
         setLoading(true);
         setError(null);

         // Mock authentication for demo purposes
         // In a real app, this would be: const response = await fetch("/api/login", {...});
         if (email === "demo@gmail.com" && password === "demo") {
            const mockToken = "mock-jwt-token-" + Date.now();
            const mockUser: User = {
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

   const register = async (email: string, password: string, name: string) => {
      try {
         setLoading(true);
         setError(null);

         // Mock registration for demo purposes
         // In a real app, this would be: const response = await fetch("/api/register", {...});
         if (email && password && name) {
            const mockToken = "mock-jwt-token-" + Date.now();
            const mockUser: User = {
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
