require("dotenv").config();
const pool = require('../../../database/redshift')

//top 10 de valores en utc
async function topUTC(req, res, next){
   let dateA = new Date().getFullYear() -1;
   let dateM = new Date().getMonth();
   pool.connect().then(client => {
      
      client.query(`
      SELECT
      DISTINCT utc, 
      cod_ano_mes,
      SUM(CAST(unidades AS REAL)) AS "UNIDADES",
      SUM(CAST(valores AS REAL)) AS "VALORES",
      CAST(COUNT(*) AS INT) AS CANTIDAD
      FROM "proveedores"."public"."tbl_proveedores_xl" 
      WHERE 
      cod_ano_mes >= ${dateA}${dateM}
      AND    
      grupo_proveedor = ${req.params.id}
      GROUP BY utc,cod_ano_mes
      ORDER BY valores DESC;
      `)
      .then(resp => {
            client.release()
            //console.log(resp.rows);
            res.send(resp.rows)
         })
      .catch(err => console.log(err))


   }).catch(err => console.log(err))   

}

//calculat YTD
async function chartYTD(req, res, next) {

   pool.connect().then(client => {
      console.log();
      client.query(`
      SELECT
         SUM(CAST(unidades AS REAL)) AS "UNIDADES",
         SUM(CAST(valores AS REAL)) AS "VALORES",
         COUNT(*) AS CANTIDAD
      FROM "proveedores"."public"."tbl_proveedores_xl" 
      WHERE 
          cod_ano_mes >= ${new Date().getFullYear()-1}01
      AND    
         grupo_proveedor = ${req.params.id} `)
         .then(resp => { 
            client.release()
            //console.log(resp.rows);
            res.send(resp.rows)
         })
         .catch(err => console.log(err))



   }).catch(err => console.log(err))
}
//calculos de MAT
async function chartMAT(req, res, next) {
   let dateA = new Date().getFullYear() -1;
   let dateM = new Date().getMonth();

   pool.connect().then(client => {
      
      client.query(`
      SELECT
      DISTINCT cod_ano_mes,
      SUM(CAST(unidades AS REAL)) AS "UNIDADES",
      SUM(CAST(valores AS REAL)) AS "VALORES",
      CAST(COUNT(*) AS INT) AS CANTIDAD
      FROM "proveedores"."public"."tbl_proveedores_xl" 
      WHERE 
         cod_ano_mes >= ${dateA}${dateM}
      AND    
         grupo_proveedor = ${req.params.id}
      GROUP BY cod_ano_mes
      ORDER BY cod_ano_mes ASC;
      `)
      .then(resp => {
            client.release()
            //console.log(resp.rows);
            res.send(resp.rows)
         })
      .catch(err => console.log(err))


   }).catch(err => console.log(err))
}
//calculo total del mercado valores y unidades 3 años
async function total(req, res, next) {
   pool.connect().then(client => {
      
      client.query(`
               SELECT 
                  CAST(SUM(unidades) as REAL) AS unidades,
                  CAST(SUM(valores) as REAL)  AS valores
               FROM (
               SELECT 
                     CAST(SUM(unidades) as REAL) AS unidades,
                     CAST(SUM(valores) as REAL)  AS valores
               FROM "proveedores"."public"."tbl_proveedores_xl"
               GROUP BY unidades, valores
               UNION ALL
               SELECT 
                     CAST(SUM(unidades) as REAL) AS unidades,
                     CAST(SUM(valores) as REAL)  AS valores
               FROM "proveedores"."public"."tbl_proveedores_sm"
               GROUP BY unidades, valores
             )`)
      .then(resp => {
            client.release()
            //console.log(resp.rows);
            res.send(resp.rows)
         })
      .catch(err => console.log(err))


   }).catch(err => console.log(err))
}


module.exports = [chartYTD, chartMAT, total, topUTC];