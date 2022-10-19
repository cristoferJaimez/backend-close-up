const jwt = require("jsonwebtoken");
require("dotenv").config();
//generate token
module.exports =   function (data) {
    let token =  JSON.stringify(data)

    const  token_ =  jwt.sign(token,process.env.JWT)
    return token_;
}

