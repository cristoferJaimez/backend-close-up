const jwt = require("jsonwebtoken");

//validate token
function validateJWT(req, res, next) {
  const accessToken = req.headers["authorization"] || req.query.accessToken;
  if (!accessToken) res.json({msg: "Access denied", status: 200});

  const data = jwt.verify(accessToken, process.env.JWT, (err, data) => {
    if (err) {
      res.redirect('/')
      res.status(400).send("Access denied, token expired or incorrect");
      
    } else {
      next();
    }
  });
}

module.exports = [validateJWT];
