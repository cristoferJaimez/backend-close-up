const express = require('express');
const router_maps = express.Router();
const fetch = require('node-fetch')
require("dotenv").config();
const [chartOne, chartMat] = require('../../../controllers/maps/chart/charOne')



router_maps.get('/api/math/chart_one/:id', chartOne);
router_maps.get('/api/math/chart_MAT/:id', chartMat);


module.exports = router_maps