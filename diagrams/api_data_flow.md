# API Integration & Data Flow Diagrams

## 1. Complete API Request Lifecycle

```mermaid
sequenceDiagram
    participant User
    participant Component
    participant React
    participant API
    participant Backend
    participant Database

    User->>Component: Click "Load Data"
    Component->>React: setLoading(true)
    React->>User: Show loading spinner

    Component->>API: fetch('/api/users')

    rect rgb(255, 255, 200)
        Note over API,Database: Backend Processing
        API->>Backend: HTTP GET /api/users
        Backend->>Database: Query users
        Database-->>Backend: Return data
        Backend-->>API: JSON response
    end

    alt Success (200 OK)
        API-->>Component: Response data
        Component->>React: setData(users)
        Component->>React: setLoading(false)
        React->>User: Display user list
    else Error (4xx/5xx)
        API-->>Component: Error response
        Component->>React: setError(message)
        Component->>React: setLoading(false)
        React->>User: Display error message
    else Network Error
        API-->>Component: Network failure
        Component->>React: setError('Network error')
        Component->>React: setLoading(false)
        React->>User: Display "Check connection"
    end
```

---

## 2. useState for Data Fetching Pattern

```mermaid
stateDiagram-v2
    [*] --> Idle: Component Mount

    Idle --> Loading: User clicks "Fetch"

    Loading --> Success: API returns 200
    Loading --> Error: API returns error
    Loading --> NetworkError: Network fails

    Success --> Idle: User clicks "Refresh"
    Error --> Loading: User clicks "Retry"
    NetworkError --> Loading: User clicks "Retry"

    Success --> [*]: Component Unmount
    Error --> [*]: Component Unmount

    note right of Loading
        State:
        loading = true
        data = null
        error = null
    end note

    note right of Success
        State:
        loading = false
        data = response
        error = null
    end note

    note right of Error
        State:
        loading = false
        data = null
        error = message
    end note
```

_Diagrams should not contain code - removed for cleaner visualization._

---

## 3. React Query/TanStack Query Flow

```mermaid
flowchart TD
    Component[Component Renders] --> UseQuery[useQuery hook]

    UseQuery --> Cache{Data in<br/>Cache?}

    Cache -->|Yes - Fresh| Return1[Return cached data<br/>isLoading: false]
    Cache -->|Yes - Stale| Background[Return cached data<br/>+ Refetch in background]
    Cache -->|No| Fetch[Fetch from API<br/>isLoading: true]

    Fetch --> API[API Call]
    Background --> API

    API --> Success{Response?}

    Success -->|200 OK| Store[Store in cache<br/>Set fresh timestamp]
    Success -->|Error| Error[Store error state]

    Store --> Return2[Return data<br/>isLoading: false]
    Error --> Return3[Return error<br/>isError: true]

    Return2 --> Auto{Auto refetch?}
    Auto -->|Window focus| Refetch1[Refetch data]
    Auto -->|Interval| Refetch2[Refetch data]
    Auto -->|Manual| Wait[Wait for trigger]

    style Cache fill:#e1f5e1
    style Store fill:#d4edda
    style Return1 fill:#d4edda
```

_Diagrams should not contain code - removed for cleaner visualization._

---

## 4. CRUD Operations Flow

```mermaid
graph TD
    subgraph Create POST
        C1[User fills form] --> C2[Submit]
        C2 --> C3[POST /api/users]
        C3 --> C4{Success?}
        C4 -->|Yes| C5[Add to list<br/>Show success]
        C4 -->|No| C6[Show error]
    end

    subgraph Read GET
        R1[Component mount] --> R2[GET /api/users]
        R2 --> R3[Display list]
    end

    subgraph Update PUT/PATCH
        U1[User edits item] --> U2[Submit changes]
        U2 --> U3[PUT /api/users/:id]
        U3 --> U4{Success?}
        U4 -->|Yes| U5[Update list<br/>Show success]
        U4 -->|No| U6[Show error]
    end

    subgraph Delete DELETE
        D1[User clicks delete] --> D2[Confirm dialog]
        D2 --> D3[DELETE /api/users/:id]
        D3 --> D4{Success?}
        D4 -->|Yes| D5[Remove from list<br/>Show success]
        D4 -->|No| D6[Show error]
    end

    style C5 fill:#d4edda
    style R3 fill:#d4edda
    style U5 fill:#d4edda
    style D5 fill:#d4edda
```

---

## 5. Optimistic Updates Pattern

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant Cache
    participant API

    User->>UI: Click "Like"

    rect rgb(200, 255, 200)
        Note over UI,Cache: Optimistic Update
        UI->>Cache: Immediately update cache<br/>(likes: 10 → 11)
        UI->>User: Show liked state instantly
    end

    UI->>API: POST /api/like

    alt Success
        API-->>UI: 200 OK
        Note over Cache: Cache already correct ✅
    else Error
        API-->>UI: Error
        rect rgb(255, 200, 200)
            Note over UI,Cache: Rollback
            UI->>Cache: Revert cache<br/>(likes: 11 → 10)
            UI->>User: Show error + original state
        end
    end
```


---

## 6. Pagination Flow

```mermaid
stateDiagram-v2
    [*] --> Page1: Load initial

    Page1 --> Page2: Next clicked
    Page2 --> Page3: Next clicked
    Page3 --> PageN: Next clicked

    PageN --> Page3: Previous clicked
    Page3 --> Page2: Previous clicked
    Page2 --> Page1: Previous clicked

    Page1 --> [*]: Unmount

    note right of Page1
        GET /api/users?page=1&limit=10
        State: page=1, hasMore=true
    end note

    note right of Page2
        GET /api/users?page=2&limit=10
        State: page=2, hasMore=true
    end note

    note right of PageN
        GET /api/users?page=N&limit=10
        State: page=N, hasMore=false
    end note
```


---

## 7. Infinite Scroll Flow

```mermaid
flowchart TD
    Start[Load Page 1] --> Display[Display Items]
    Display --> Scroll{User scrolls<br/>near bottom?}

    Scroll -->|No| Wait[Keep waiting]
    Wait --> Scroll

    Scroll -->|Yes| Check{Has more<br/>pages?}

    Check -->|No| End[Show 'No more items']
    Check -->|Yes| Fetch[Fetch Next Page]

    Fetch --> Append[Append to list]
    Append --> Display

    style Start fill:#e1f5e1
    style Append fill:#d4edda
    style End fill:#fff3cd
```


---

## 8. Error Handling Strategies

```mermaid
graph TD
    API[API Call] --> Response{Response<br/>Status}

    Response -->|200-299| Success[✅ Success State]
    Response -->|400| Client[❌ Client Error<br/>Invalid request]
    Response -->|401| Auth[❌ Unauthorized<br/>Redirect to login]
    Response -->|403| Forbidden[❌ Forbidden<br/>Show access denied]
    Response -->|404| NotFound[❌ Not Found<br/>Show not found page]
    Response -->|500-599| Server[❌ Server Error<br/>Show error + retry]
    Response -->|Network| Network[❌ Network Error<br/>Check connection]

    Client --> Retry1{Retryable?}
    Server --> Retry2{Retryable?}
    Network --> Retry3{Retryable?}

    Retry1 -->|Yes| Retry[Show retry button]
    Retry2 -->|Yes| Retry
    Retry3 -->|Yes| Retry

    Retry1 -->|No| Final[Show error message]
    Retry2 -->|No| Final
    Retry3 -->|No| Final

    style Success fill:#d4edda
    style Auth fill:#fff3cd
    style Server fill:#ffe1e1
    style Network fill:#ffe1e1
```


---

## 9. Loading States UI Patterns

```mermaid
stateDiagram-v2
    [*] --> Initial: Component Mount

    Initial --> FetchingFirst: First load
    FetchingFirst --> Success: Data loaded
    FetchingFirst --> Error: Failed

    Success --> FetchingMore: Load more / Refresh
    FetchingMore --> Success: More data loaded
    FetchingMore --> Error: Failed

    Error --> FetchingRetry: Retry clicked
    FetchingRetry --> Success: Recovered
    FetchingRetry --> Error: Failed again

    Success --> [*]: Unmount
    Error --> [*]: Unmount

    note right of FetchingFirst
        UI: Full page skeleton
        or spinner
    end note

    note right of FetchingMore
        UI: Keep showing data
        + loading indicator
    end note

    note right of Error
        UI: Error message
        + retry button
    end note
```


---

## 10. Caching Strategy

```mermaid
graph TD
    Request[API Request] --> Check{Cache<br/>Exists?}

    Check -->|No| Fetch[Fetch from API]
    Check -->|Yes| Fresh{Is Fresh?}

    Fresh -->|Yes| Return1[Return cached data<br/>No API call]
    Fresh -->|No| Stale{Use stale<br/>while revalidate?}

    Stale -->|Yes| Both[Return cached +<br/>Fetch in background]
    Stale -->|No| Fetch

    Fetch --> Store[Store in cache]
    Both --> Update[Update cache when done]

    Store --> Return2[Return fresh data]
    Update --> Return3[Return updated data]

    style Return1 fill:#d4edda
    style Return2 fill:#d4edda
    style Both fill:#fff3cd
```


---

## 11. Full-Stack Data Flow

```mermaid
sequenceDiagram
    participant Browser
    participant React
    participant API
    participant Express
    participant MongoDB

    Browser->>React: User submits form
    React->>API: POST /api/tasks<br/>{title, description}

    API->>Express: HTTP Request
    Express->>Express: Validate data

    alt Validation Success
        Express->>MongoDB: db.tasks.insertOne()
        MongoDB-->>Express: {_id, ...task}
        Express-->>API: 201 Created + task
        API-->>React: Response data
        React->>React: Update local state
        React->>Browser: Show success + new task
    else Validation Failed
        Express-->>API: 400 Bad Request
        API-->>React: Validation errors
        React->>Browser: Show error messages
    else Database Error
        Express->>MongoDB: db.tasks.insertOne()
        MongoDB-->>Express: Error
        Express-->>API: 500 Server Error
        API-->>React: Error response
        React->>Browser: Show error + retry
    end
```

---

## 12. WebSocket Real-time Updates

```mermaid
sequenceDiagram
    participant Client1
    participant Client2
    participant WebSocket
    participant Server
    participant DB

    Client1->>WebSocket: Connect
    Client2->>WebSocket: Connect
    WebSocket-->>Client1: Connected
    WebSocket-->>Client2: Connected

    Client1->>WebSocket: Send message
    WebSocket->>Server: Handle message
    Server->>DB: Save message
    DB-->>Server: Saved

    rect rgb(200, 255, 200)
        Note over Server,Client2: Broadcast to all
        Server->>WebSocket: Broadcast
        WebSocket-->>Client1: New message
        WebSocket-->>Client2: New message
    end

    Client1->>Client1: Update UI
    Client2->>Client2: Update UI
```


---

## 13. File Upload Flow

```mermaid
flowchart TD
    Start[User selects file] --> Validate{Validate<br/>file?}

    Validate -->|Invalid| Error1[Show error<br/>size/type]
    Validate -->|Valid| Preview[Show preview]

    Preview --> Upload[User confirms]
    Upload --> FormData[Create FormData]
    FormData --> Progress[Upload with progress]

    Progress --> API[POST /api/upload]
    API --> Server{Server<br/>response?}

    Server -->|Success| Save[Save file reference]
    Server -->|Error| Error2[Show error]

    Save --> Display[Display uploaded file]
    Error2 --> Retry{Retry?}
    Retry -->|Yes| Upload

    style Preview fill:#fff3cd
    style Display fill:#d4edda
    style Error1 fill:#ffe1e1
    style Error2 fill:#ffe1e1
```


---

**Created** October 6, 2025
** For** React Course - LongNDT **Topic** API Integration & Data Flow **Related Lessons** Lesson 3, Lesson 5
