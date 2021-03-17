const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
     const token = req.header('auth-token');
     if(!token) return res.status(401).send("Access Denied");

     try {
         const verify = jwt.verify(token, process.env.TOKEN_SECRET);
         req.userVerify = verify;
         next();
     } catch (error) {
        res.status(400).send("Invalid Token");
     }
}