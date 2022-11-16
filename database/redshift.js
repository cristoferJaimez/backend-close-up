var Redshift = require('node-redshift')
var Pool = require('pg-pool')

var client = {
  "user": 'awscloseup',
  "database": 'proveedores',
  "password": 'Devcloseup2022_',
  "port": '5439',
  "host": 'redshift-cluster-2.cfvvscfzw2rb.us-east-1.redshift.amazonaws.com',
};


const pool = new Pool(client)
pool.connect().then(client => {
    client.query('select * from tbl_proveedores_sm where  cod_farmacia = 22676 ')
    .then(res => {
        client.release()
        console.log(res);
        
    })
    .catch(err => console.log(err))

}).catch( err => console.log(err))
