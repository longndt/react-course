import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export interface User {
   id: string;
   email: string;
   name: string;
   role: "user" | "admin";
}

type StoredUser = User & { password: string };

interface AuthContextType {
   user: User | null;
   users: User[];
   loading: boolean;
   error: Error | null;
   login: (email: string, password: string) => Promise<void>;
   logout: () => void;
   register: (email: string, password: string, name: string) => Promise<void>;
   deleteUser: (userId: string) => void;
}

interface AuthProviderProps {
   children: ReactNode;
}

const USERS_STORAGE_KEY = "auth:users";

const INITIAL_USERS: StoredUser[] = [
   {
      id: "user-1",
      email: "user@gmail.com",
      name: "Demo User",
      password: "user",
      role: "user"
   },
   {
      id: "admin-1",
      email: "admin@gmail.com",
      name: "Admin User",
      password: "admin",
      role: "admin"
   }
];

const toPublicUser = (storedUser: StoredUser): User => ({
   id: storedUser.id,
   email: storedUser.email,
   name: storedUser.name,
   role: storedUser.role
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
   const [storedUsers, setStoredUsers] = useState<StoredUser[]>(() => {
      const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);

      if (savedUsers) {
         try {
            const parsed: StoredUser[] = JSON.parse(savedUsers);
            if (Array.isArray(parsed) && parsed.length > 0) {
               return parsed;
            }
         } catch {
            // fall back to initial users when parsing fails
         }
      }

      return INITIAL_USERS;
   });
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(storedUsers));
   }, [storedUsers]);

   useEffect(() => {
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      const storedUserId = localStorage.getItem("userId");

      if (token && tokenExpiry && storedUserId) {
         const now = Date.now();
         const expiry = parseInt(tokenExpiry, 10);

         if (!Number.isNaN(expiry) && now < expiry) {
            const existingUser = storedUsers.find(item => item.id === storedUserId);

            if (existingUser) {
               setUser(toPublicUser(existingUser));
               setLoading(false);
               return;
            }
         }
      }

      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("userId");
      setLoading(false);
   }, [storedUsers]);

   const createTokenWithExpiry = (hours: number = 24) => {
      const now = Date.now();
      const expiry = now + hours * 60 * 60 * 1000;
      return {
         token: `greenwich-token-${now}`,
         expiry: expiry.toString()
      };
   };

   const login = async (email: string, password: string) => {
      try {
         setLoading(true);
         setError(null);

         const normalizedEmail = email.trim().toLowerCase();
         const existingUser = storedUsers.find(item => item.email === normalizedEmail);

         await new Promise(resolve => setTimeout(resolve, 600));

         if (!existingUser || existingUser.password !== password) {
            throw new Error("Invalid credentials. Try user@gmail.com / user or admin@gmail.com / admin");
         }

         const { token, expiry } = createTokenWithExpiry(24);

         localStorage.setItem("token", token);
         localStorage.setItem("tokenExpiry", expiry);
         localStorage.setItem("userId", existingUser.id);
         setUser(toPublicUser(existingUser));
      } catch (err) {
         const loginError = err instanceof Error ? err : new Error("Login failed");
         setError(loginError);
         throw loginError;
      } finally {
         setLoading(false);
      }
   };

   const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("userId");
      setUser(null);
   };

   const register = async (email: string, password: string, name: string) => {
      try {
         setLoading(true);
         setError(null);

         const normalizedEmail = email.trim().toLowerCase();

         if (!normalizedEmail || !password || !name.trim()) {
            throw new Error("All fields are required");
         }

         if (storedUsers.some(existing => existing.email === normalizedEmail)) {
            throw new Error("Email is already registered");
         }

         await new Promise(resolve => setTimeout(resolve, 800));

         const newUser: StoredUser = {
            id: `user-${Date.now()}`,
            email: normalizedEmail,
            name: name.trim(),
            password,
            role: "user"
         };

         const { token, expiry } = createTokenWithExpiry(24);

         setStoredUsers(prev => [...prev, newUser]);
         localStorage.setItem("token", token);
         localStorage.setItem("tokenExpiry", expiry);
         localStorage.setItem("userId", newUser.id);
         setUser(toPublicUser(newUser));
      } catch (err) {
         const registerError = err instanceof Error ? err : new Error("Registration failed");
         setError(registerError);
         throw registerError;
      } finally {
         setLoading(false);
      }
   };

   const deleteUser = (userId: string) => {
      setStoredUsers(prev => prev.filter(existing => existing.id !== userId));

      if (user?.id === userId) {
         logout();
      }
   };

   const users = useMemo(() => storedUsers.map(toPublicUser), [storedUsers]);

   return (
      <AuthContext.Provider
         value={{ user, users, loading, error, login, logout, register, deleteUser }}
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
