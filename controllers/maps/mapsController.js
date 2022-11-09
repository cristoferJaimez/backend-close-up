require("dotenv").config();
const fetch = require('node-fetch')

async function  getMap(req, res,next) {

const  maps= await  fetch('https://maps-json.s3.amazonaws.com/co/maps.min.json')
             .then( response => response.json())
             .catch(err => console.log(err))

             res.status(200).json( 
                maps  
             )
}

module.exports = [getMap];