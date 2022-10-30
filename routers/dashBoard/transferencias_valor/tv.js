const express = require('express');
const router_tv = express.Router();
const fetch = require('node-fetch')
require("dotenv").config();
const [all] = require('../../../controllers/transferencias_valor/tv')



/*
router_tv.get('/api/tv/all', async (req,res,next)=>{
    
  await  fetch("https://nokjtktuj4.execute-api.us-east-1.amazonaws.com/test/listar_tv")
        .then((reqs) =>  {
            res.send(reqs.body._readableState.buffer.head.data.toString())
            }
        )
        .catch((err) => {  console.log(err) });
     
  
        
});
*/

router_tv.get('/api/tv/all', all);


module.exports = router_tv