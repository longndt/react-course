import { http, HttpResponse } from 'msw'

// ✅ CHECKPOINT: Mock data for Product Catalog API responses
const mockProducts = [
  {
    _id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 999.99,
    category: 'electronics',
    inStock: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '2',
    name: 'MacBook Air M2',
    description: 'Ultra-thin laptop with M2 chip and all-day battery life',
    price: 1199.99,
    category: 'electronics',
    inStock: true,
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z'
  },
  {
    _id: '3',
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Max Air cushioning',
    price: 150.00,
    category: 'sports',
    inStock: false,
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z'
  },
  {
    _id: '4',
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 12.99,
    category: 'books',
    inStock: true,
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-01-04T00:00:00.000Z'
  },
  {
    _id: '5',
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with 12-cup capacity',
    price: 89.99,
    category: 'home',
    inStock: true,
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-05T00:00:00.000Z'
  }
]

// ✅ CHECKPOINT: MSW handlers for Product Catalog API endpoints
export const handlers = [
  // GET /api/products - Fetch all products
  http.get('/api/products', () => {
    return HttpResponse.json(mockProducts)
  }),

  // GET /api/products/:id - Fetch single product
  http.get('/api/products/:id', ({ params }) => {
    const product = mockProducts.find(p => p._id === params.id)
    if (!product) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }
    return HttpResponse.json(product)
  }),

  // POST /api/products - Create new product
  http.post('/api/products', async ({ request }) => {
    const body = await request.json()
    const newProduct = {
      _id: String(mockProducts.length + 1),
      ...body,
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockProducts.push(newProduct)

    return HttpResponse.json(newProduct, { status: 201 })
  }),

  // PUT /api/products/:id - Update product
  http.put('/api/products/:id', async ({ params, request }) => {
    const body = await request.json()
    const productIndex = mockProducts.findIndex(p => p._id === params.id)

    if (productIndex === -1) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }

    mockProducts[productIndex] = {
      ...mockProducts[productIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    return HttpResponse.json(mockProducts[productIndex])
  }),

  // DELETE /api/products/:id - Delete product
  http.delete('/api/products/:id', ({ params }) => {
    const productIndex = mockProducts.findIndex(p => p._id === params.id)

    if (productIndex === -1) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }

    mockProducts.splice(productIndex, 1)

    return HttpResponse.json({ message: 'Product deleted successfully' })
  })
]