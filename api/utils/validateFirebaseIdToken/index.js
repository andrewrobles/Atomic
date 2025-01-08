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

    try {
        const idToken = authorizationHeader.split("Bearer ")[1]
        console.log(`idToken: ${idToken}`)
        const user = await getUserFromIdToken(idToken)
        if (user.email != 'andrewrobles@verizon.net') {
            return res.status(401).send("Unauthorized")
        }
        next();
    } catch (error) {
        console.error("Error verifying ID token:", error)
        res.status(403).send("Forbidden");
    }
}

const getUserFromIdToken = async (idToken) => {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log("Decoded Token:", decodedToken);
  
      const uid = decodedToken.uid; 
      console.log("User UID:", uid);
  
      const userRecord = await admin.auth().getUser(uid);
      console.log("User Record:", userRecord);
  
      return userRecord; 
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

module.exports = validateFirebaseIdToken