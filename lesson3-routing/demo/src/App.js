import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Products } from './pages/Products';
import { Profile } from './pages/Profile';
import { Cart } from './pages/Cart';

export function App() {
   return (
      <BrowserRouter>
         <AuthProvider>
            <Layout>
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/products" element={<Products />} />
                  <Route
                     path="/profile"
                     element={
                        <ProtectedRoute>
                           <Profile />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="/cart"
                     element={
                        <ProtectedRoute>
                           <Cart />
                        </ProtectedRoute>
                     }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
               </Routes>
            </Layout>
         </AuthProvider>
      </BrowserRouter>
   );
}
