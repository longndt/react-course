import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
    status: 'pending' | 'completed' | 'cancelled';
}

interface CartContextType {
    cartItems: CartItem[];
    orders: Order[];
    addToCart: (product: Product) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    checkout: () => void;
    getCartTotal: () => number;
}

interface CartProviderProps {
    children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    // Load cart and orders from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        const savedOrders = localStorage.getItem('orders');

        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }

        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Save orders to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addToCart = (product: Product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.image
                }];
            }
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

    const checkout = () => {
        if (cartItems.length === 0) return;

        const newOrder: Order = {
            id: Date.now().toString(),
            items: [...cartItems],
            total: getCartTotal(),
            date: new Date().toISOString(),
            status: 'completed'
        };

        setOrders(prevOrders => [newOrder, ...prevOrders]);
        clearCart();
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                orders,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                checkout,
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
