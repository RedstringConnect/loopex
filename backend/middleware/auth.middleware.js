const { verifyToken } = require('../utils/jwt.util');
const User = require('../models/User.model');

/**
 * Middleware to authenticate requests using JWT
 */
const authenticate = async (req, res, next) => {
    try {
        // Get token from cookie first, then fall back to header
        let token = req.cookies?.authToken;

        // Fall back to Authorization header for API clients
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided',
            });
        }

        // Verify token
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
            });
        }

        // Get user from database
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        // Attach user to request object
        req.user = {
            userId: user._id,
            email: user.email,
            verified: user.verified,
            onboardingCompleted: user.onboardingCompleted,
        };

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({
            success: false,
            message: 'Authentication failed',
        });
    }
};

module.exports = { authenticate };
