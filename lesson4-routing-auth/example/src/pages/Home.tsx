export function Home() {
   return (
      <div className="home">
         <h1>Welcome to React Shop</h1>
         <p>
            Browse our collection of products and find the perfect items for your needs.
         </p>
         <div className="feature-grid">
            <div className="feature">
               <h3>Quality Products</h3>
               <p>We offer only the highest quality items from trusted manufacturers.</p>
            </div>
            <div className="feature">
               <h3>Fast Shipping</h3>
               <p>Get your items delivered quickly and reliably.</p>
            </div>
            <div className="feature">
               <h3>Customer Service</h3>
               <p>Our support team is here to help you 24/7.</p>
            </div>
         </div>
      </div>
   );
}
