# Lesson 3 Demo: Product Catalog with Axios

This demo shows how to integrate a React frontend with a Node.js/Express backend and MongoDB database using **Axios** - the most popular HTTP client for React applications.

**Learning Focus:**
- Axios for HTTP requests
- Error handling and loading states
- CRUD operations (Create, Read, Update, Delete)
- Professional API integration patterns

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Backend Server
```bash
# Start the backend server (required)
npm run server
```

### 3. Start the Frontend (in another terminal)
```bash
# Start the React development server
npm run dev
```

### 4. Open in Browser
Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🚀 **Server Requirements**

### **Backend Server** (Required)
- **Runs on**: `http://localhost:3001`
- **Uses**: Real HTTP requests to your backend API
- **Database**: MongoDB for data persistence
- **Setup**: Run `npm run server` in one terminal, `npm run dev` in another
- **Error Handling**: Shows proper error messages if server is unavailable

## What You'll Learn

### 🛍️ **Product Catalog Features:**
- **View Products** - Browse all products with details
- **Add Products** - Create new products with form validation
- **Update Stock** - Toggle product availability
- **Delete Products** - Remove products from catalog
- **Real-time Updates** - See changes immediately

### 🔧 **Technical Skills:**
- **Axios Integration** - HTTP client setup and usage
- **Error Handling** - Professional error states and retry logic
- **Loading States** - User feedback during API calls
- **Form Management** - Controlled components and validation
- **State Management** - Local state with React hooks

### 📊 **API Endpoints Used:**
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Project Structure

```
src/
├── components/
│   ├── ProductList.tsx      # Product display and management
│   └── ProductForm.tsx      # Product creation form
├── App.tsx                  # Main application component
├── App.css                  # Styling
└── main.tsx                 # Application entry point
```

## Key Concepts Demonstrated

### 1. **Axios Configuration**
```typescript
// src/services/api.ts
const API_BASE_URL = "http://localhost:3001/api";
const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
```

### 2. **Error Handling**
```typescript
// src/components/ProductList.tsx
try {
  const response = await axios.get(`${API_BASE_URL}/products`);
  setProducts(response.data);
} catch (err) {
  if (axios.isAxiosError(err)) {
    setError(`Failed to fetch products: ${err.message}`);
  }
}
```

### 3. **Loading States**
```typescript
// src/components/ProductList.tsx
const [loading, setLoading] = useState(true);
// Show loading spinner while fetching data
```

### 4. **Form Validation**
```typescript
// src/components/ProductForm.tsx
if (!formData.name.trim() || formData.price <= 0) {
  setError("Please fill in all fields with valid values.");
  return;
}
```

## Mock Data

The demo includes realistic product data:
- **Electronics** - iPhones, MacBooks, etc.
- **Books** - Classic novels and textbooks
- **Sports** - Athletic shoes and equipment
- **Home** - Kitchen appliances and furniture

## Next Steps

1. **Try the Features** - Add, edit, and delete products
2. **Check the Code** - Examine how Axios is used
3. **Modify the UI** - Customize the styling
4. **Add Features** - Implement search, filtering, or pagination

## Troubleshooting

### Common Issues:

1. **"Failed to fetch products"** - Make sure backend server is running on port 3001
2. **"Connection refused"** - Run `npm run server` in another terminal first
3. **CORS errors** - Backend should handle CORS, check server configuration
4. **Empty page** - Check that both frontend and backend servers are running
5. **Port conflicts** - Vite will automatically use the next available port

### Debug Mode:
- Open browser DevTools to see console logs
- Check Network tab for API calls
- Verify backend server is running on port 3001

---

**Ready to build your own API-integrated React app?** This demo provides the foundation for any e-commerce or catalog application! 🚀
