# Advanced React Patterns & Architecture

This guide covers advanced React patterns, architectural decisions, and enterprise-level practices that will set your capstone project apart and prepare you for senior developer roles.

**Prerequisites:** Complete Lessons 1-5 and feel confident with React fundamentals.

---

## **Advanced Component Patterns**

### 1. Compound Components Pattern

Create components that work together as a cohesive unit, like HTML's `<select>` and `<option>`.

```tsx
// Compound Components Example: Modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

Modal.Header = function ModalHeader({ children }: { children: React.ReactNode }) {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Modal.Header must be used within Modal');

  return (
    <div className="modal-header">
      {children}
      <button onClick={context.onClose}>×</button>
    </div>
  );
};

Modal.Body = function ModalBody({ children }: { children: React.ReactNode }) {
  return <div className="modal-body">{children}</div>;
};

Modal.Footer = function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className="modal-footer">{children}</div>;
};

// Usage - Clean and Intuitive
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Header>
        <h2>Confirm Action</h2>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this item?</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </Modal.Footer>
    </Modal>
  );
}
```

### 2. Render Props Pattern

Share code between components using a prop whose value is a function.

```tsx
// DataFetcher with Render Props
interface DataFetcherProps<T> {
  url: string;
  children: (data: {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <>{children({ data, loading, error, refetch: fetchData })}</>;
}

// Usage - Flexible Rendering
function UserProfile({ userId }: { userId: string }) {
  return (
    <DataFetcher<User> url={`/api/users/${userId}`}>
      {({ data: user, loading, error, refetch }) => {
        if (loading) return <UserSkeleton />;
        if (error) return <ErrorMessage error={error} onRetry={refetch} />;
        if (!user) return <NotFound />;

        return (
          <div className="user-profile">
            <img src={user.avatar} alt={user.name} />
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        );
      }}
    </DataFetcher>
  );
}
```

### 3. Higher-Order Components (HOCs)

Enhance components with additional functionality.

```tsx
// HOC for Authentication
function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <LoadingSpinner />;
    if (!user) return <LoginPrompt />;

    return <WrappedComponent {...props} />;
  };
}

// HOC for Error Boundary
function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
) {
  return function ComponentWithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

// Usage - Compose HOCs
const SecureUserDashboard = withAuth(
  withErrorBoundary(UserDashboard, ErrorFallback)
);
```

---

## 🏛 ** Advanced Architecture Patterns**

### 1. Feature-Based Folder Structure

Organize code by features, not by file types.

```
src/
├── shared/              # Shared utilities and components
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Reusable custom hooks
│   ├── utils/           # Helper functions
│   └── types/           # Shared TypeScript types
├── features/            # Feature-specific code
│   ├── auth/
│   │   ├── components/  # Auth-specific components
│   │   ├── hooks/       # Auth-specific hooks
│   │   ├── services/    # Auth API calls
│   │   ├── types/       # Auth-specific types
│   │   └── index.ts     # Feature exports
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── projects/
├── pages/               # Route components
└── app/                 # App-level configuration
    ├── store/           # Global state management
    ├── router/          # Routing configuration
    └── providers/       # Context providers
```

### 2. Dependency Injection Pattern

Make components testable and modular by injecting dependencies.

```tsx
// Service Interface
interface UserService {
  getUser(id: string): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
}

// API Implementation
class ApiUserService implements UserService {
  constructor(private apiClient: ApiClient) {}

  async getUser(id: string): Promise<User> {
    return this.apiClient.get(`/users/${id}`);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.apiClient.put(`/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<void> {
    await this.apiClient.delete(`/users/${id}`);
  }
}

// Service Provider
const ServiceContext = createContext<{
  userService: UserService;
} | null>(null);

function ServiceProvider({ children }: { children: React.ReactNode }) {
  const services = {
    userService: new ApiUserService(new ApiClient())
  };

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
}

// Custom Hook for Service Access
function useServices() {
  const services = useContext(ServiceContext);
  if (!services) throw new Error('useServices must be used within ServiceProvider');
  return services;
}

// Component Using Injected Service
function UserProfile({ userId }: { userId: string }) {
  const { userService } = useServices();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    userService.getUser(userId).then(setUser);
  }, [userId, userService]);

  return user ? <UserCard user={user} /> : <Loading />;
}
```

### 3. CQRS (Command Query Responsibility Segregation)

Separate read and write operations for better scalability.

```tsx
// Commands (Write Operations)
interface CreateUserCommand {
  type: 'CREATE_USER';
  payload: { name: string; email: string };
}

interface UpdateUserCommand {
  type: 'UPDATE_USER';
  payload: { id: string; data: Partial<User> };
}

type UserCommand = CreateUserCommand | UpdateUserCommand;

// Command Handlers
class UserCommandHandler {
  constructor(private apiClient: ApiClient) {}

  async handle(command: UserCommand): Promise<void> {
    switch (command.type) {
      case 'CREATE_USER':
        await this.apiClient.post('/users', command.payload);
        break;
      case 'UPDATE_USER':
        await this.apiClient.put(`/users/${command.payload.id}`, command.payload.data);
        break;
    }
  }
}

// Queries (Read Operations)
interface GetUserQuery {
  type: 'GET_USER';
  payload: { id: string };
}

interface GetUsersQuery {
  type: 'GET_USERS';
  payload: { filters?: UserFilters };
}

type UserQuery = GetUserQuery | GetUsersQuery;

// Query Handlers
class UserQueryHandler {
  constructor(private apiClient: ApiClient) {}

  async handle(query: UserQuery): Promise<any> {
    switch (query.type) {
      case 'GET_USER':
        return this.apiClient.get(`/users/${query.payload.id}`);
      case 'GET_USERS':
        return this.apiClient.get('/users', { params: query.payload.filters });
    }
  }
}

// Usage in Components
function UserManagement() {
  const commandHandler = useCommandHandler();
  const queryHandler = useQueryHandler();

  const createUser = async (userData: CreateUserData) => {
    await commandHandler.handle({
      type: 'CREATE_USER',
      payload: userData
    });
    // Trigger refetch of user list
  };

  return (
    <div>
      <CreateUserForm onSubmit={createUser} />
      <UserList queryHandler={queryHandler} />
    </div>
  );
}
```

---

## **Performance Optimization Patterns**

### 1. Advanced Memoization Strategies

```tsx
// Memoize Expensive Calculations
function ExpensiveComponent({ items, filters }: Props) {
  // Only recalculate when items or filters change
  const processedItems = useMemo(() => {
    return items
      .filter(item => matchesFilters(item, filters))
      .sort((a, b) => a.priority - b.priority)
      .map(item => ({ ...item, computedValue: expensiveCalculation(item) }));
  }, [items, filters]);

  // Memoize callback to prevent child re-renders
  const handleItemClick = useCallback((itemId: string) => {
    // Handle click logic
  }, []);

  return (
    <div>
      {processedItems.map(item => (
        <MemoizedItemCard
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
}

// Memoize Component with Complex Props Comparison
const MemoizedItemCard = memo(ItemCard, (prevProps, nextProps) => {
  // Custom comparison logic
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.updatedAt === nextProps.item.updatedAt &&
    prevProps.onClick === nextProps.onClick
  );
});
```

### 2. Virtual Scrolling for Large Lists

```tsx
// Virtual Scrolling Hook
function useVirtualScrolling<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5
}: {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight),
    items.length - 1
  );

  const startIndex = Math.max(0, visibleStart - overscan);
  const endIndex = Math.min(items.length - 1, visibleEnd + overscan);

  const visibleItems = items.slice(startIndex, endIndex + 1);

  return {
    visibleItems,
    startIndex,
    totalHeight: items.length * itemHeight,
    offsetY: startIndex * itemHeight,
    setScrollTop
  };
}

// Virtual List Component
function VirtualList<T>({ items, renderItem, itemHeight = 50 }: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(400);

  const {
    visibleItems,
    startIndex,
    totalHeight,
    offsetY,
    setScrollTop
  } = useVirtualScrolling({
    items,
    itemHeight,
    containerHeight
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className="virtual-list"
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) =>
            renderItem(item, startIndex + index)
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## **Advanced State Management**

### 1. State Machines with XState

```tsx
import { createMachine, interpret } from 'xstate';

// Define state machine
const userMachine = createMachine({
  id: 'user',
  initial: 'idle',
  context: {
    user: null,
    error: null,
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading'
      }
    },
    loading: {
      invoke: {
        id: 'fetchUser',
        src: 'fetchUserService',
        onDone: {
          target: 'success',
          actions: 'assignUser'
        },
        onError: {
          target: 'failure',
          actions: 'assignError'
        }
      }
    },
    success: {
      on: {
        FETCH: 'loading',
        EDIT: 'editing'
      }
    },
    editing: {
      on: {
        SAVE: 'saving',
        CANCEL: 'success'
      }
    },
    saving: {
      invoke: {
        id: 'saveUser',
        src: 'saveUserService',
        onDone: 'success',
        onError: 'failure'
      }
    },
    failure: {
      on: {
        RETRY: 'loading'
      }
    }
  }
});

// React Hook for State Machine
function useUserMachine(userId: string) {
  const [state, send] = useMachine(userMachine, {
    services: {
      fetchUserService: () => fetch(`/api/users/${userId}`).then(r => r.json()),
      saveUserService: (context) =>
        fetch(`/api/users/${userId}`, {
          method: 'PUT',
          body: JSON.stringify(context.user)
        })
    },
    actions: {
      assignUser: (context, event) => {
        context.user = event.data;
      },
      assignError: (context, event) => {
        context.error = event.data;
      }
    }
  });

  return [state, send];
}
```

### 2. Advanced Zustand Patterns

```tsx
// Slice Pattern for Large Stores
interface UserSlice {
  users: User[];
  selectedUser: User | null;
  fetchUsers: () => Promise<void>;
  selectUser: (id: string) => void;
}

interface ProjectSlice {
  projects: Project[];
  activeProject: Project | null;
  createProject: (data: CreateProjectData) => Promise<void>;
}

// Create User Slice
const createUserSlice: StateCreator<AppState, [], [], UserSlice> = (set, get) => ({
  users: [],
  selectedUser: null,

  fetchUsers: async () => {
    const users = await api.getUsers();
    set(state => ({ ...state, users }));
  },

  selectUser: (id: string) => {
    const user = get().users.find(u => u.id === id);
    set(state => ({ ...state, selectedUser: user || null }));
  }
});

// Create Project Slice
const createProjectSlice: StateCreator<AppState, [], [], ProjectSlice> = (set) => ({
  projects: [],
  activeProject: null,

  createProject: async (data) => {
    const project = await api.createProject(data);
    set(state => ({
      ...state,
      projects: [...state.projects, project],
      activeProject: project
    }));
  }
});

// Combine Slices
type AppState = UserSlice & ProjectSlice;

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (...args) => ({
        ...createUserSlice(...args),
        ...createProjectSlice(...args)
      }),
      { name: 'app-store' }
    )
  )
);
```

---

## **Advanced Testing Patterns**

### 1. Component Integration Testing

```tsx
// Test Utils with Custom Render
function createTestWrapper({ initialState, services }: TestWrapperOptions) {
  return function TestWrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClient client={createTestQueryClient()}>
        <MemoryRouter>
          <ServiceProvider services={services}>
            <StateProvider initialState={initialState}>
              {children}
            </StateProvider>
          </ServiceProvider>
        </MemoryRouter>
      </QueryClient>
    );
  };
}

// Integration Test
describe('UserProfile Integration', () => {
  it('should display user data and handle updates', async () => {
    const mockUserService = {
      getUser: jest.fn().mockResolvedValue(mockUser),
      updateUser: jest.fn().mockResolvedValue({ ...mockUser, name: 'Updated Name' })
    };

    const wrapper = createTestWrapper({
      services: { userService: mockUserService }
    });

    render(<UserProfile userId="123" />, { wrapper });

    // Wait for data to load
    expect(await screen.findByText('John Doe')).toBeInTheDocument();

    // Test user interaction
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // Verify service was called
    expect(mockUserService.updateUser).toHaveBeenCalledWith('123', {
      name: 'Updated Name'
    });

    // Verify UI updates
    expect(await screen.findByText('Updated Name')).toBeInTheDocument();
  });
});
```

---

## **Scalability Considerations**

### 1. Micro-Frontend Architecture

```tsx
// Module Federation Setup (webpack.config.js)
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        userModule: 'userModule@http://localhost:3001/remoteEntry.js',
        projectModule: 'projectModule@http://localhost:3002/remoteEntry.js'
      }
    })
  ]
};

// Dynamic Module Loading
const UserModule = lazy(() => import('userModule/UserDashboard'));
const ProjectModule = lazy(() => import('projectModule/ProjectBoard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/users/*" element={<UserModule />} />
          <Route path="/projects/*" element={<ProjectModule />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

### 2. Code Splitting Strategies

```tsx
// Route-based Code Splitting
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const UserPage = lazy(() => import('../pages/UserPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));

// Component-based Code Splitting
const HeavyChart = lazy(() => import('../components/HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}

// Feature-based Code Splitting
const AdminPanel = lazy(() =>
  import('../features/admin').then(module => ({ default: module.AdminPanel }))
);
```

---

## 🛡

**Security Best Practices**

### 1. XSS Prevention

```tsx
// Safe HTML Rendering
import DOMPurify from 'dompurify';

function SafeHTML({ html }: { html: string }) {
  const cleanHTML = DOMPurify.sanitize(html);

  return (
    <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
  );
}

// Content Security Policy Hook
function useCSP() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'";
    document.head.appendChild(meta);

    return () => document.head.removeChild(meta);
  }, []);
}
```

### 2. Authentication & Authorization Patterns

```tsx
// Role-based Access Control
interface RBACProps {
  roles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function RBAC({ roles, children, fallback }: RBACProps) {
  const { user } = useAuth();

  const hasRequiredRole = roles.some(role =>
    user?.roles?.includes(role)
  );

  if (!hasRequiredRole) {
    return fallback || <AccessDenied />;
  }

  return <>{children}</>;
}

// Usage
function AdminPanel() {
  return (
    <RBAC roles={['admin']} fallback={<NotAuthorized />}>
      <AdminDashboard />
    </RBAC>
  );
}
```

---

## **When to Use These Patterns**

### For Capstone Projects:

**Essential (Must Use):**
- Feature-based folder structure
- Advanced memoization
- Error boundaries
- Basic compound components

**Good to Have:**
- Render props for data fetching
- State machines for complex flows
- Virtual scrolling for large datasets

**Advanced (Bonus Points):**
- Micro-frontend architecture
- CQRS pattern
- Advanced testing strategies

### Career Preparation:

These patterns demonstrate:
- **Senior-level thinking**

- **Scalability awareness**

- **Performance optimization**

- **Maintainable code architecture**

- **Enterprise development experience**

---

## **Further Reading**

- [React Design Patterns](https://reactpatterns.com/)
- [Advanced React Component Patterns](https://kentcdodds.com/blog/advanced-react-component-patterns)
- [XState Documentation](https://xstate.js.org/docs/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Micro-Frontend Architecture](https://micro-frontends.org/)

---

* Master these patterns and you'll be ready for senior React developer roles straight out of university!*
