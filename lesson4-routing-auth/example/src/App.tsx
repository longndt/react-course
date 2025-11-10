import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Products } from './pages/Products';
import { Profile } from './pages/Profile';
import { Cart } from './pages/Cart';
import { MyOrders } from './pages/MyOrders';
import { ChangePassword } from './pages/ChangePassword';
import { AdminDashboard } from './pages/AdminDashboard';
import { Unauthorized } from './pages/Unauthorized';
import { NotFound } from './pages/NotFound';

export function App() {
   return (
     <BrowserRouter>
       <AuthProvider>
         <CartProvider>
           <Layout>
             <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
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
               <Route
                 path="/my-orders"
                 element={
                   <ProtectedRoute>
                     <MyOrders />
                   </ProtectedRoute>
                 }
               />
               <Route
                 path="/change-password"
                 element={
                   <ProtectedRoute>
                     <ChangePassword />
                   </ProtectedRoute>
                 }
               />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
             </Routes>
           </Layout>
         </CartProvider>
       </AuthProvider>
     </BrowserRouter>
   );
}
