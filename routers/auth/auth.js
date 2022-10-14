const express = require('express')
const router = express.Router();
require("dotenv").config();
const jwt = require('../../middleware/jwt.js')
const [me,signIn, signOut] = require('../../controllers/auth/authController')

//GET
router.get("/me", jwt, me );
//POST
router.post("/signin", signIn);
router.post("/signout", jwt, signOut);
//export
module.exports = router
