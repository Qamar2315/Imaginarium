const admin = require("../config/firebaseConfig");

// Middleware to authenticate Firebase ID tokens
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).send("Unauthorized: No token provided");
  }

  // Extract token from 'Bearer <token>' format
  const idToken = authHeader.split("Bearer ")[1];

  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error("Error while verifying Firebase ID token:", err);
    res.status(403).send("Unauthorized");
  }
};

module.exports = authenticateToken;
