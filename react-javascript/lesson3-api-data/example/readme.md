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

### 2. Start the Development Server
```bash
# Start with REAL server (requires backend running on port 3001)
npm run dev

# Or start with MOCK API (fake server - no backend needed)
npm run dev:mock
```

### 3. Open in Browser
Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🚀 **Server Options**

### **Real Server Mode** (`npm run dev`)
- **Requires**: Backend server running on `http://localhost:3001`
- **Uses**: Real HTTP requests to your backend API
- **Best for**: Testing with actual database and server logic
- **Setup**: Run `npm run server` in another terminal first

### **Mock API Mode** (`npm run dev:mock`)
- **Requires**: No backend server needed
- **Uses**: MSW (Mock Service Worker) to intercept API calls
- **Best for**: Learning, development, and testing without backend
- **Setup**: Just run the command - no additional setup needed

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
│   ├── ProductList.jsx      # Product display and management
│   └── ProductForm.jsx      # Product creation form
├── mocks/
│   └── handlers.js          # Mock API responses
├── App.jsx                  # Main application component
├── App.css                  # Styling
└── main.jsx                 # Application entry point
```

## Key Concepts Demonstrated

### 1. **Axios Configuration**
```javascript
const API_BASE_URL = "http://localhost:3001/api";
const response = await axios.get(`${API_BASE_URL}/products`);
```

### 2. **Error Handling**
```javascript
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
```javascript
const [loading, setLoading] = useState(true);
// Show loading spinner while fetching data
```

### 4. **Form Validation**
```javascript
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

#### **Real Server Mode** (`npm run dev`)
1. **"Failed to fetch products"** - Make sure backend server is running on port 3001
2. **"Connection refused"** - Run `npm run server` in another terminal first
3. **CORS errors** - Backend should handle CORS, check server configuration

#### **Mock API Mode** (`npm run dev:mock`)
1. **"Failed to fetch products"** - MSW should start automatically, check console for MSW messages
2. **Empty page** - Check browser console for MSW startup messages
3. **Port conflicts** - Vite will automatically use the next available port

### Debug Mode:
- Open browser DevTools to see console logs
- Check Network tab for API calls
- Verify mock data in handlers.js

---

**Ready to build your own API-integrated React app?** This demo provides the foundation for any e-commerce or catalog application! 🚀