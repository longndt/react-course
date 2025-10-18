import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../ProtectedRoute'
import { AuthProvider } from '../AuthContext'

// Mock the useAuth hook
const mockUseAuth = vi.fn()

vi.mock('../AuthContext', async () => {
  const actual = await vi.importActual('../AuthContext')
  return {
    ...actual,
    useAuth: () => mockUseAuth(),
  }
})

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
)

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render children when user is authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
      loading: false,
    })

    render(
      <TestWrapper>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('should show loading when authentication is loading', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: true,
    })

    render(
      <TestWrapper>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('should redirect to login when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
    })

    render(
      <TestWrapper>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>
    )

    // The Navigate component should redirect to /login
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('should render children when user has required role', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'admin@example.com', name: 'Admin User', role: 'admin' },
      loading: false,
    })

    render(
      <TestWrapper>
        <ProtectedRoute requiredRole="admin">
          <div>Admin Content</div>
        </ProtectedRoute>
      </TestWrapper>
    )

    expect(screen.getByText('Admin Content')).toBeInTheDocument()
  })

  it('should redirect to unauthorized when user lacks required role', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'user@example.com', name: 'Regular User', role: 'user' },
      loading: false,
    })

    render(
      <TestWrapper>
        <ProtectedRoute requiredRole="admin">
          <div>Admin Content</div>
        </ProtectedRoute>
      </TestWrapper>
    )

    // The Navigate component should redirect to /unauthorized
    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument()
  })

  it('should render children when no role is required', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'user@example.com', name: 'Regular User' },
      loading: false,
    })

    render(
      <TestWrapper>
        <ProtectedRoute>
          <div>Public Content</div>
        </ProtectedRoute>
      </TestWrapper>
    )

    expect(screen.getByText('Public Content')).toBeInTheDocument()
  })
})
