const admin = require('../config/firebaseConfig');

// Middleware to authenticate Firebase ID tokens
const authenticateToken = async (req, res, next) => {
    const idToken = req.headers.authorization;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (err) {
        console.error('Error while verifying Firebase ID token:', err);
        res.status(403).send('Unauthorized');
    }
};

module.exports = authenticateToken;