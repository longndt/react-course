export function Home() {
   return (
      <div className="home">
         <div className="hero-section">
            <h1>Welcome to React Shop</h1>
            <p>
               Browse our collection of products and find the perfect items for your needs.
            </p>
            <div className="hero-image">
               <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop"
                  alt="Modern shopping experience"
               />
            </div>
         </div>

         <div className="feature-grid">
            <div className="feature">
               <div className="feature-icon">
                  <img
                     src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=200&h=200&fit=crop"
                     alt="Quality Products"
                  />
               </div>
               <h3>Quality Products</h3>
               <p>We offer only the highest quality items from trusted manufacturers.</p>
            </div>
            <div className="feature">
               <div className="feature-icon">
                  <img
                     src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop"
                     alt="Fast Shipping"
                  />
               </div>
               <h3>Fast Shipping</h3>
               <p>Get your items delivered quickly and reliably.</p>
            </div>
            <div className="feature">
               <div className="feature-icon">
                  <img
                     src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=200&h=200&fit=crop"
                     alt="Customer Service"
                  />
               </div>
               <h3>Customer Service</h3>
               <p>Our support team is here to help you 24/7.</p>
            </div>
         </div>

         <div className="cta-section">
            <h2>Ready to Start Shopping?</h2>
            <p>Explore our amazing collection of products today!</p>
            <a href="/products" className="cta-button">Shop Now</a>
         </div>
      </div>
   );
}
