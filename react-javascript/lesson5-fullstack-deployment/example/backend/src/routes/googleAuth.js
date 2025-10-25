import express from 'express';
import passport from '../config/passport.js';
import { generateToken } from '../utils/generateToken.js';

const router = express.Router();

// @desc    Google OAuth login
// @route   GET /api/auth/google
// @access  Public
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                return res.redirect('/login?error=authentication_failed');
            }

            // Generate JWT token
            const token = generateToken(user._id.toString());

            // Redirect to frontend with token
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            res.redirect(`${frontendUrl}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }))}`);
        } catch (error) {
            console.error('Google OAuth callback error:', error);
            res.redirect('/login?error=server_error');
        }
    }
);

export default router;
