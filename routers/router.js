const express = require('express')
const router = express.Router();


  //GET
  router.get("/", (req, res) => {
    res.send("hola desde backEnd");
  });


//export
module.exports = router
