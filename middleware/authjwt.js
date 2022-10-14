const jwt = require("jsonwebtoken");

//generate token
module.exports = function (data) {
    return jwt.sign(data,process.env.JWT, {expiresIn: '5m'})
}

