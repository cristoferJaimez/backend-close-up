require("dotenv").config();
const pool = require('../../../database/redshift')

async function chartOne(req, res, next) {
   pool.connect().then(client => {
      client.query(`
      SELECT
         SUM(CAST(unidades AS REAL)) AS "UNIDADES",
         SUM(CAST(valores AS REAL)) AS "VALORES",
         COUNT(*) AS CANTIDAD
      FROM "proveedores"."public"."tbl_proveedores_xl" 
      WHERE 
          cod_ano_mes >= 202101
      AND    
         grupo_proveedor = ${req.params.id} `)
         .then(resp => {
            client.release()
            //console.log(resp.rows);
            res.send(resp.rows)


         })
         .catch(err => console.log(err))


         client.query(`
         SELECT
            DISTINCT utc,
         SUM(CAST(unidades AS REAL)) AS "UNIDADES",
         SUM(CAST(valores AS REAL)) AS "VALORES",
         COUNT(*) AS CANTIDAD
         FROM "proveedores"."public"."tbl_proveedores_xl" 
         WHERE 
            cod_ano_mes >= 202101
         and    
            grupo_proveedor = ${req.params.id}
         GROUP BY utc
         ORDER BY UNIDADES, VALORES, CANTIDAD DESC;
         `)

   }).catch(err => console.log(err))
}


async function chartMAT(req, res, next) {
   pool.connect().then(client => {
      

      client.query(`
      SELECT
      DISTINCT utc,cod_ano_mes,
      SUM(CAST(unidades AS REAL)) AS "UNIDADES",
      SUM(CAST(valores AS REAL)) AS "VALORES",
      CAST(COUNT(*) AS INT) AS CANTIDAD
      FROM "proveedores"."public"."tbl_proveedores_xl" 
      WHERE 
         cod_ano_mes >= 202101
      and    
         grupo_proveedor = '2'
      GROUP BY utc,cod_ano_mes
      ORDER BY cod_ano_mes DESC;
      `)
      .then(resp => {
            client.release()
            //console.log(resp.rows);
            res.send(resp.rows)
         })
      .catch(err => console.log(err))


   }).catch(err => console.log(err))
}



module.exports = [chartOne, chartMAT];