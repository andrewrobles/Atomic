const admin = require('firebase-admin')

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const validateIdToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized")
  }
  next()
}

const getEmailFromIdToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const uid = decodedToken.uid
    const userRecord = await admin.auth().getUser(uid)
    return userRecord.email
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

module.exports = { validateIdToken, getEmailFromIdToken } 