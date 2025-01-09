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

  try {
    const idToken = authorizationHeader.split("Bearer ")[1]
    const email = await getEmailFromIdToken(idToken)
    console.log(`email: ${email}`)
    if (email != 'andrewrobles@verizon.net') {
      return res.status(401).send("Unauthorized")
    }
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error)
    res.status(401).send("Unauthorized");
  }
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