require("dotenv").config();
const pool = require('../../database/redshift')




function data(req, res, next) {

  
  pool.connect().then(client => {
    client.query(`SELECT  cast(cod_ano_mes as varchar), sum(cast(valores as real)) as valores, sum(cast(unidades as real)) as unidades, cast(count(*) as integer) as numero FROM tbl_proveedores_xl where grupo_proveedor = ${req.params.id} group by cod_ano_mes order by cod_ano_mes asc; `)
      .then(resp => {
        client.release()
        console.log(resp);
        res.send(resp)


      })
      .catch(err => console.log(err))

  }).catch(err => console.log(err))

}



module.exports = [data];
