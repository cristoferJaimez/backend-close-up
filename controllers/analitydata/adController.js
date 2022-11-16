require("dotenv").config();
var Redshift = require('node-redshift')

var client = {
  "user": 'awscloseup',
  "database": 'proveedores',
  "password": 'Devcloseup2022_',
  "port": '5439',
  "host": 'redshift-cluster-2.cfvvscfzw2rb.us-east-1.redshift.amazonaws.com',
};

function data(req, res, next) {
  var re = Redshift(client)



}



module.exports = [data];
