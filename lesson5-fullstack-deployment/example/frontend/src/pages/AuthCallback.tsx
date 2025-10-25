import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const AuthCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loginWithGoogle } = useAuth();

    useEffect(() => {
        const handleGoogleCallback = async () => {
            const token = searchParams.get('token');
            const userParam = searchParams.get('user');
            const error = searchParams.get('error');

            if (error) {
                console.error('Google OAuth error:', error);
                navigate('/login?error=oauth_failed');
                return;
            }

            if (token && userParam) {
                try {
                    const user = JSON.parse(decodeURIComponent(userParam));
                    await loginWithGoogle(user, token);
                    navigate('/dashboard');
                } catch (err) {
                    console.error('Error processing Google OAuth:', err);
                    navigate('/login?error=processing_failed');
                }
            } else {
                navigate('/login?error=missing_data');
            }
        };

        handleGoogleCallback();
    }, [searchParams, navigate, loginWithGoogle]);

    return <LoadingSpinner />;
};

export default AuthCallback;
