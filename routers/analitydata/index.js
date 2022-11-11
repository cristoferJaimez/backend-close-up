const express = require('express');
const router_ad = express.Router();
const fetch = require('node-fetch')
require("dotenv").config();
const [data] = require('../../controllers/analitydata/adController')



router_ad.get('/api/data/:id', data);


module.exports = router_ad