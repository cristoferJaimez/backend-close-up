const express = require('express');
const router_maps = express.Router();
const fetch = require('node-fetch')
require("dotenv").config();
const [getMap] = require('../../controllers/maps/mapsController')



router_maps.get('/api/maps', getMap);


module.exports = router_maps