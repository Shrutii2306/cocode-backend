const jwt = require('jsonwebtoken');


function verifyToken (req, res, next) {

    // get the Bearer from the header of the request
    const authHeader = req.headers['authorization'];

    // extract the jwt token from the Bearer token
    const token = authHeader && authHeader.split(' ')[1];
    
    // if the token is missing return the error
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }
  
    // verify the token using token key and if invalid return the error else return the decrypted info retreived from the token and call the method to fetch userdata from DB
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) return res.status(403).json({token:token, message: 'Invalid token' });
      req.user = user;
      next();
    });
}

module.exports = verifyToken;