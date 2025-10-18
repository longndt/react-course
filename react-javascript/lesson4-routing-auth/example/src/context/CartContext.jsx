import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);

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

    const addToCart = (product) => {
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

    const updateQuantity = (itemId, quantity) => {
        if (quantity < 1) return;

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const checkout = () => {
        if (cartItems.length === 0) return;

        const newOrder = {
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
