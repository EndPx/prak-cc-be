const admin = require("../config/firebase-config.js");

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
        console.log('gagal')
      res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = {verifyToken};