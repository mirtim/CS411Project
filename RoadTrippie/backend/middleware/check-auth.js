const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'Test_Secret');
    req.userid = decodedToken.userid;
    next();
  } catch {
    res.status(401).json({message: "Auth Failed"});
  }
};
