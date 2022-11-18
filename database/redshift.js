var Pool = require('pg-pool')

var client = {
  "user": 'awscloseup',
  "database": 'proveedores',
  "password": 'Devcloseup2022_',
  "port": '5439',
  "host": 'redshift-cluster-2.cfvvscfzw2rb.us-east-1.redshift.amazonaws.com',
};


const pool = new Pool(client)
/*

*/

module.exports = pool;