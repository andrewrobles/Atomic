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
    if (idToken === 'demo') {
      return 'demo'
    }
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const uid = decodedToken.uid
    const userRecord = await admin.auth().getUser(uid)
    return userRecord.email
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

const getToday = timezone => {
    const today = new Date();

    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const parts = formatter.formatToParts(today)
    const yyyy = parts.find(part => part.type === 'year').value
    const mm = parts.find(part => part.type === 'month').value
    const dd = parts.find(part => part.type === 'day').value

    const formattedDate = `${yyyy}-${mm}-${dd}`
    return formattedDate
}

module.exports = { validateIdToken, getEmailFromIdToken, getToday } 