import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import FileManager from './pages/FileManager';
import PerformanceDemo from './pages/PerformanceDemo';
import AuthCallback from './pages/AuthCallback';
import LoadingSpinner from './components/LoadingSpinner';

const AppContent = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className={isAuthenticated ? 'authenticated-page' : 'app'}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
                    />
                    <Route
                        path="/dashboard"
                        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/file-manager"
                        element={isAuthenticated ? <FileManager /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/performance"
                        element={isAuthenticated ? <PerformanceDemo /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/auth/callback"
                        element={<AuthCallback />}
                    />
                    <Route
                        path="/"
                        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;
