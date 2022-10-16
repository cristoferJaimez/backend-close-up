const express = require('express')
const router = express.Router();
require("dotenv").config();

const jwt = require('../../middleware/jwt.js')
const checkRolAuth = require('../../middleware/checkRolAuth.js');

const [me, signIn, signOut, test] = require('../../controllers/auth/authController')

//GET
router.get("/me",  [jwt] ,  me );
router.get("/signin", signIn);
//POST
router.post("/signin", signIn);
router.post("/signout", [jwt], signOut);
router.post('/test', [jwt] ,test )
//export
module.exports = router
