const express = require('express');
const router_maps = express.Router();
const fetch = require('node-fetch')
require("dotenv").config();
const [chartYTD, chartMat, total] = require('../../../controllers/maps/chart/charOne')



router_maps.get('/api/math/chart_YTD/:id', chartYTD);
router_maps.get('/api/math/chart_MAT/:id', chartMat);


router_maps.get('/api/math/total', total);


module.exports = router_maps