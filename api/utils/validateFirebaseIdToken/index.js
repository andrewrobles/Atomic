const admin = require('firebase-admin')

var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const validateFirebaseIdToken = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).send("Unauthorized")
    }

    const idToken = authorizationHeader.split("Bearer ")[1]
    console.log(`idToken: ${idToken}`)

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Error verifying ID token:", error)
        res.status(403).send("Forbidden");
    }
}

module.exports = validateFirebaseIdToken