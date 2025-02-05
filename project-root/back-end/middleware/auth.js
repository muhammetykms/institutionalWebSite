const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];

  console.log("Token:", token); // Token'ı loglayalım

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Yetkisiz erişim." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Decode edilmiş token'ı loglayalım
    req.admin = decoded.admin;
    next();
  } catch (error) {
    console.log("Invalid token");
    res.status(403).json({ message: "Geçersiz token." });
  }
};

module.exports = authenticateToken;
