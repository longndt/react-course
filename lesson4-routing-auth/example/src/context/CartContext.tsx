import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { useAuth } from '../auth/AuthContext';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
    status: 'pending' | 'completed' | 'cancelled';
    userId: string;
    userName: string;
    userEmail: string;
}

interface CartContextType {
    cartItems: CartItem[];
    orders: Order[];
    allOrders: Order[];
    addToCart: (product: Product) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    checkout: () => void;
    removeOrder: (orderId: string) => void;
    getCartTotal: () => number;
}

interface CartProviderProps {
    children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cart';
const ORDER_STORAGE_KEY = 'orders';

const normalizeOrder = (order: any): Order => ({
    id: order?.id ? String(order.id) : Date.now().toString(),
    items: Array.isArray(order?.items) ? order.items : [],
    total: typeof order?.total === 'number' ? order.total : 0,
    date: typeof order?.date === 'string' ? order.date : new Date().toISOString(),
    status: order?.status === 'pending' || order?.status === 'cancelled' ? order.status : 'completed',
    userId: typeof order?.userId === 'string' ? order.userId : 'legacy-user',
    userName: typeof order?.userName === 'string' ? order.userName : 'Legacy User',
    userEmail: typeof order?.userEmail === 'string' ? order.userEmail : 'legacy@example.com',
});

export function CartProvider({ children }: CartProviderProps) {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            try {
                const parsed: CartItem[] = JSON.parse(savedCart);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            } catch {
                // ignore parse errors and fall back to empty cart
            }
        }
        return [];
    });
    const [allOrders, setAllOrders] = useState<Order[]>(() => {
        const savedOrders = localStorage.getItem(ORDER_STORAGE_KEY);
        if (savedOrders) {
            try {
                const parsed: Order[] = JSON.parse(savedOrders);
                if (Array.isArray(parsed)) {
                    return parsed.map(normalizeOrder);
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

    const addToCart = (product: Product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...prevItems,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.image
                }
            ];
        });
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity < 1) return;

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (itemId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = (): number => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const orders = useMemo(() => {
        if (!user) {
            return [];
        }
        return allOrders.filter(order => order.userId === user.id);
    }, [allOrders, user]);

    const checkout = () => {
        if (cartItems.length === 0 || !user) {
            return;
        }

        const newOrder: Order = {
            id: Date.now().toString(),
            items: [...cartItems],
            total: getCartTotal(),
            date: new Date().toISOString(),
            status: 'completed',
            userId: user.id,
            userName: user.name,
            userEmail: user.email
        };

        setAllOrders(prevOrders => [newOrder, ...prevOrders]);
        clearCart();
    };

    const removeOrder = (orderId: string) => {
        setAllOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
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
                getCartTotal
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
