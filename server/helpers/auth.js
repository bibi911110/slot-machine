const jwt = require('jsonwebtoken'); // middleware to validate token

exports.authCheck = async (req) => {
    const token = req.header('authtoken');
    if (!token) throw new Error('No token found');

    try {
        const currentUser = await jwt.verify(token, process.env.TOKEN_SECRET);
        console.log('CURRENT USER', currentUser);
        return currentUser;
    } catch (error) {
        console.log('AUTH CHECK ERROR', error);
        throw new Error('Invalid or expired token');
    }
};

exports.authCheckMiddleware = (req, res, next) => {
    const token = req.header('authtoken');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next(); // to continue the flow
    } catch (err) {
        res.status(400).json({ error: 'Token is not valid' });
    }
};
