const jwt = require('jsonwebtoken');
const {
   pool
} = require('../../Config/db');

module.exports = async function (req, res, next) {
   const token = req.header('auth-token');
   if (!token) return res.status(401).send("Access Denied");

   try {
      const verify = jwt.verify(token, process.env.TOKEN_SECRET);
      const response = await pool.query("SELECT * FROM users WHERE user_id=$1", [verify._id.user_id]);
      if (res.status(200)) {
         if (response.rowCount != 0 && response.rowCount != null) {
            req.userVerify = verify;
            next();
         } else {
            res.status(401).send("Unauthorized");
         }
      } else {
         res.json({
            done: false,
            message: "A bad response, Please try again.",
            data: []
         })
      }
   } catch (error) {
      res.status(400).send("Invalid Token");
   }
}