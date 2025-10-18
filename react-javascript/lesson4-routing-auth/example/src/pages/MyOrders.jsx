import { useCart } from '../context/CartContext';

export function MyOrders() {
    const { orders } = useCart();

    return (
        <div className="my-orders">
            <h2>My Orders</h2>

            {orders.length === 0 ? (
                <div className="empty-orders">
                    <div className="empty-icon">📦</div>
                    <h3>No orders yet</h3>
                    <p>Add some products to your cart and checkout to see your orders here!</p>
                    <a href="/products" className="shop-button">Start Shopping</a>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <h3>Order #{order.id}</h3>
                                    <p className="order-date">
                                        {new Date(order.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <div className="order-status">
                                    <span className={`status-badge status-${order.status}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                    <p className="order-total">${order.total.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="order-items">
                                <h4>Items ({order.items.length})</h4>
                                <div className="items-list">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="order-item">
                                            <img src={item.image} alt={item.name} className="item-image" />
                                            <div className="item-details">
                                                <h5>{item.name}</h5>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="item-price">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
