# React Security Best Practices

## Overview

Security is crucial for React applications, especially when handling user data, authentication, and API interactions. This guide covers essential security practices and common vulnerabilities to avoid.

## Table of Contents

1. [XSS Prevention](#xss-prevention)
2. [CSRF Protection](#csrf-protection)
3. [Secure Authentication](#secure-authentication)
4. [Input Validation](#input-validation)
5. [Environment Variables Security](#environment-variables-security)
6. [HTTPS Implementation](#https-implementation)
7. [Content Security Policy](#content-security-policy)
8. [Dependency Security](#dependency-security)
9. [API Security](#api-security)
10. [Common Vulnerabilities](#common-vulnerabilities)

---

## XSS Prevention

### Sanitizing User Input

```jsx
import DOMPurify from 'dompurify';

// Sanitize HTML content before rendering
function SafeHTMLContent({ content }) {
  const sanitizedContent = DOMPurify.sanitize(content);
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}

// Better: Use text content when possible
function SafeTextContent({ content }) {
  return <div>{content}</div>;
}
```

### Avoiding dangerouslySetInnerHTML

```jsx
// Bad: Direct HTML injection
function BadComponent({ userContent }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: userContent }} />
  );
}

// Good: Use proper React patterns
function GoodComponent({ userContent }) {
  return (
    <div>
      {userContent.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
}
```

### URL Validation

```jsx
function SafeLink({ href, children }) {
  const isValidUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  };

  if (!isValidUrl(href)) {
    return <span>{children}</span>;
  }

  return (
    <a 
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
```

---

## CSRF Protection

### CSRF Token Implementation

```jsx
// Add CSRF token to all API requests
function useCSRFToken() {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch CSRF token from server
    fetch('/api/csrf-token')
      .then(res => res.json())
      .then(data => setCsrfToken(data.token));
  }, []);

  return csrfToken;
}

// Use in API calls
function useSecureAPI() {
  const csrfToken = useCSRFToken();

  const makeRequest = async (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  };

  return { makeRequest };
}
```

---

## Secure Authentication

### JWT Token Security

```jsx
// Secure token storage and management
class SecureAuth {
  static TOKEN_KEY = 'auth_token';
  static REFRESH_KEY = 'refresh_token';

  static setTokens(accessToken, refreshToken) {
    // Store in httpOnly cookies (server-side) or secure storage
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_KEY, refreshToken);
  }

  static getAccessToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static getRefreshToken() {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  static clearTokens() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
  }

  static isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  }
}
```

### Password Security

```jsx
// Client-side password validation (server-side validation is required)
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: password.length >= minLength && 
             hasUpperCase && 
             hasLowerCase && 
             hasNumbers && 
             hasSpecialChar,
    errors: [
      password.length < minLength && 'Password must be at least 8 characters',
      !hasUpperCase && 'Password must contain uppercase letter',
      !hasLowerCase && 'Password must contain lowercase letter',
      !hasNumbers && 'Password must contain number',
      !hasSpecialChar && 'Password must contain special character',
    ].filter(Boolean)
  };
}

function SecurePasswordInput({ value, onChange }) {
  const validation = validatePassword(value);

  return (
    <div>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!validation.isValid}
        aria-describedby="password-errors"
      />
      {validation.errors.length > 0 && (
        <ul id="password-errors" role="alert">
          {validation.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## Input Validation

### Client-Side Validation

```jsx
// Comprehensive input validation
function useValidation() {
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const sanitizeInput = (input) => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .slice(0, 1000); // Limit length
  };

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    return {
      isValid: allowedTypes.includes(file.type) && file.size <= maxSize,
      errors: [
        !allowedTypes.includes(file.type) && 'Invalid file type',
        file.size > maxSize && 'File too large'
      ].filter(Boolean)
    };
  };

  return {
    validateEmail,
    validatePhone,
    sanitizeInput,
    validateFile
  };
}
```

### Form Security

```jsx
function SecureForm() {
  const { validateEmail, sanitizeInput } = useValidation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Sanitize data before sending
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message)
    };

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData)
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        aria-invalid={!!errors.name}
      />
      {errors.name && <span role="alert">{errors.name}</span>}
      
      {/* Other form fields */}
    </form>
  );
}
```

---

## Environment Variables Security

### Secure Environment Configuration

```jsx
// .env.local (never commit this file)
REACT_APP_API_URL=https://api.example.com
REACT_APP_APP_VERSION=1.0.0

// .env.example (safe to commit)
REACT_APP_API_URL=https://api.example.com
REACT_APP_APP_VERSION=1.0.0

// Environment configuration
const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  appVersion: process.env.REACT_APP_APP_VERSION || '1.0.0',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};

// Never expose sensitive data
function App() {
  return (
    <div>
      <h1>App Version: {config.appVersion}</h1>
      {/* Never do this: */}
      {/* <p>API Key: {process.env.REACT_APP_SECRET_KEY}</p> */}
    </div>
  );
}
```

### API Key Management

```jsx
// Secure API key handling
class SecureAPI {
  static async getApiKey() {
    // In production, this should come from a secure server endpoint
    if (process.env.NODE_ENV === 'development') {
      return process.env.REACT_APP_API_KEY || '';
    }
    
    // In production, fetch from secure endpoint
    throw new Error('API key must be fetched from secure endpoint');
  }

  static async makeSecureRequest(endpoint, options = {}) {
    const apiKey = await this.getApiKey();
    
    return fetch(`${config.apiUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }
}
```

---

## HTTPS Implementation

### Force HTTPS in Production

```jsx
// Force HTTPS in production
function useHTTPSRedirect() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 
        window.location.protocol !== 'https:') {
      window.location.replace(
        `https:${window.location.href.substring(window.location.protocol.length)}`
      );
    }
  }, []);
}

// Use in App component
function App() {
  useHTTPSRedirect();
  
  return (
    <div>
      {/* App content */}
    </div>
  );
}
```

---

## Content Security Policy

### CSP Implementation

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               connect-src 'self' https://api.example.com;">
```

### CSP with Nonces

```jsx
// Generate nonce for inline scripts
function generateNonce() {
  return btoa(crypto.getRandomValues(new Uint8Array(16)).join(''));
}

// Use nonce in CSP
const nonce = generateNonce();
const csp = `default-src 'self'; script-src 'self' 'nonce-${nonce}';`;

// Apply to script tags
function SecureScript({ children }) {
  return (
    <script nonce={nonce}>
      {children}
    </script>
  );
}
```

---

## Dependency Security

### Security Audit

```bash
# Regular security audits
npm audit
npm audit fix

# Check for known vulnerabilities
npx audit-ci --config audit-ci.json

# Update dependencies regularly
npm update
npm outdated
```

### Secure Package Installation

```bash
# Use exact versions for critical packages
npm install react@18.3.1 --save-exact

# Verify package integrity
npm ci

# Use package-lock.json
git add package-lock.json
```

---

## API Security

### Secure API Client

```jsx
class SecureAPIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Rate limiting
  rateLimitMap = new Map();

  async rateLimitedRequest(endpoint, options = {}) {
    const key = endpoint;
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const maxRequests = 100;

    const requests = this.rateLimitMap.get(key) || [];
    const validRequests = requests.filter((time) => now - time < windowMs);

    if (validRequests.length >= maxRequests) {
      throw new Error('Rate limit exceeded');
    }

    validRequests.push(now);
    this.rateLimitMap.set(key, validRequests);

    return this.request(endpoint, options);
  }
}
```

---

## Common Vulnerabilities

### 1. Insecure Direct Object References

```jsx
// Bad: Exposing internal IDs
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This exposes internal user IDs
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);

  return <div>{user?.name}</div>;
}

// Good: Use authenticated user context
function UserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Only fetch current user's profile
    fetch('/api/profile')
      .then(res => res.json())
      .then(setProfile);
  }, []);

  return <div>{profile?.name}</div>;
}
```

### 2. Insecure File Uploads

```jsx
function SecureFileUpload() {
  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type');
    }

    if (file.size > maxSize) {
      throw new Error('File too large');
    }

    return true;
  };

  const handleFileUpload = async (file) => {
    try {
      validateFile(file);
      
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload to secure endpoint
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      return response.json();
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  return (
    <input
      type="file"
      accept="image/jpeg,image/png"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
      }}
    />
  );
}
```

### 3. Information Disclosure

```jsx
// Bad: Exposing sensitive information
function BadErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div>
        <h1>Error occurred</h1>
        <p>Error: {error.message}</p>
        <p>Stack: {error.stack}</p> {/* Exposes internal details */}
      </div>
    );
  }

  return children;
}

// Good: Hide sensitive information
function GoodErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div>
        <h1>Something went wrong</h1>
        <p>Please try again later</p>
        {process.env.NODE_ENV === 'development' && (
          <details>
            <summary>Debug info</summary>
            <pre>{error.stack}</pre>
          </details>
        )}
      </div>
    );
  }

  return children;
}
```

---

## Security Checklist

### Development
- [ ] Input validation on both client and server
- [ ] XSS prevention with proper sanitization
- [ ] CSRF protection implemented
- [ ] Secure authentication with JWT
- [ ] HTTPS enforced in production
- [ ] Content Security Policy configured
- [ ] Dependencies regularly updated
- [ ] No sensitive data in client code
- [ ] Error handling doesn't expose internals
- [ ] File uploads properly validated

### Production
- [ ] Environment variables secured
- [ ] API keys stored securely
- [ ] Database connections encrypted
- [ ] Logging configured (no sensitive data)
- [ ] Monitoring and alerting set up
- [ ] Regular security audits
- [ ] Backup and recovery procedures
- [ ] Incident response plan

### Monitoring
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] Failed login attempt monitoring
- [ ] Suspicious activity detection
- [ ] Regular penetration testing
- [ ] Security updates applied promptly

---

**Remember**: Security is an ongoing process, not a one-time implementation. Regular audits, updates, and monitoring are essential for maintaining a secure React application.
