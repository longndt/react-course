import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const CartContext = createContext(undefined);

const CART_STORAGE_KEY = 'cart';
const ORDER_STORAGE_KEY = 'orders';

const normalizeOrder = (order) => ({
  id: order?.id ? String(order.id) : Date.now().toString(),
  items: Array.isArray(order?.items) ? order.items : [],
  total: typeof order?.total === 'number' ? order.total : 0,
  date: typeof order?.date === 'string' ? order.date : new Date().toISOString(),
  status: order?.status === 'pending' || order?.status === 'cancelled' ? order.status : 'completed',
  userId: typeof order?.userId === 'string' ? order.userId : 'legacy-user',
  userName: typeof order?.userName === 'string' ? order.userName : 'Legacy User',
  userEmail: typeof order?.userEmail === 'string' ? order.userEmail : 'legacy@example.com',
});

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        // ignore parse errors
      }
    }
    return [];
  });
  const [allOrders, setAllOrders] = useState(() => {
    const savedOrders = localStorage.getItem(ORDER_STORAGE_KEY);
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed)) {
          return parsed.map((order) => normalizeOrder(order));
        }
      } catch {
        // ignore parse errors
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(allOrders));
  }, [allOrders]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const orders = useMemo(() => {
    if (!user) {
      return [];
    }
    return allOrders.filter((order) => order.userId === user.id);
  }, [allOrders, user]);

  const checkout = () => {
    if (cartItems.length === 0 || !user) {
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      items: [...cartItems],
      total: getCartTotal(),
      date: new Date().toISOString(),
      status: 'completed',
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
    };

    setAllOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
  };

  const removeOrder = (orderId) => {
    setAllOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        allOrders,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        checkout,
        removeOrder,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
