// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header or query parameters
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer <token>"
    // console.log("req.headers: ", req.headers)
    console.log("Authenticating... ")
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded: ", decoded)
        req.user = decoded; // Attach decoded user info to the request
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired. Please log in again.' });
        }
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authenticateToken;