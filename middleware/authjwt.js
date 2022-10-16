const jwt = require("jsonwebtoken");
require("dotenv").config();
//generate token
module.exports = function (data) {
    let token =  JSON.stringify(data)
    jwt.sign(token,process.env.JWT)
}

