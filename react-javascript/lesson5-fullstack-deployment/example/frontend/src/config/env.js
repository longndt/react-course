// Environment configuration
export const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    appName: import.meta.env.VITE_APP_NAME || 'React Course Demo',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
};

// Log configuration in development
if (config.debugMode) {
    console.log('Environment Configuration:', config);
}
