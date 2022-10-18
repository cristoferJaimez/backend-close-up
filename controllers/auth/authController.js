const conx = require("../../database/conx");
require("dotenv").config();
const jwt = require('jsonwebtoken');

function me(req, res, next) {
  conx.query("CALL signIn(?, ?)",['cristo@test.com', '12345'], (err, rows, filds) =>{
    if(err) throw err;  
    res.json(rows)
  } )
}


// sign In users validation, inyect query, jwt...
async function signIn(req, res, next) {
  conx.query(
    "CALL signIn(?, ?)",
    [req.body.email, req.body.password],
    (err, rows, filds) => {
      if (!err) {
        if (rows[0].length > 0) {
            let  data = JSON.stringify(rows[0]);
            const token = jwt.sign(data, process.env.JWT)  
            res.json({token})
        } else {
        return  res.send([{ms: 'msm'}])         
        }
      } else {
        res.status(400).json({token});
      }
    }
  );
}
//end route sign In



async function signOut(req, res, next) {
  res.send("signOut");
}
async function test(req, res, next) {
  res.send("test");
}
module.exports = [me, signIn, signOut, test];
