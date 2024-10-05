const admin = require('firebase-admin');

// Firebase Admin SDK initialization (do this only once, usually in your main server file)
const serviceAccount = require('./serviceAccountKey.json'); // Path to your service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin; // Export the Firebase Admin SDK instance for use in other modules