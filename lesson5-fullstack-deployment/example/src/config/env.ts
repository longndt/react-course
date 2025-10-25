// Environment configuration
export const ENV = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    appName: import.meta.env.VITE_APP_NAME || 'React Course Demo',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
};

// API configuration
export const API_CONFIG = {
    baseURL: ENV.apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
};

// Feature flags
export const FEATURES = {
    enableFileUpload: true,
    enablePerformanceDemo: true,
    enableVirtualLists: true,
    enableCodeSplitting: true,
    enableAnalytics: ENV.enableAnalytics,
    enableDebugMode: ENV.debugMode,
};

// Performance configuration
export const PERFORMANCE_CONFIG = {
    virtualListThreshold: 1000, // Use virtual list for 1000+ items
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFilesPerUpload: 10,
    debounceDelay: 300, // ms
    throttleDelay: 100, // ms
};

// Development helpers
if (ENV.debugMode) {
    console.log('🔧 Environment Configuration:', {
        apiUrl: ENV.apiUrl,
        appName: ENV.appName,
        isDevelopment: ENV.isDevelopment,
        isProduction: ENV.isProduction,
        features: FEATURES,
    });
}
