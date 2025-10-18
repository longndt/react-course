// Environment configuration
// Vite exposes env variables through import.meta.env
// All public env vars must be prefixed with VITE_

export const ENV = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',

  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || 'Production Ready App',

  // Feature Flags
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true',

  // Environment Detection
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,

  // Build Info
  buildTime: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
  version: import.meta.env.VITE_VERSION || '1.0.0',
} as const;

// Type-safe environment
export type Environment = typeof ENV;

// Log configuration in development
if (ENV.isDevelopment) {
  console.log(' Environment Configuration:', ENV);
}
