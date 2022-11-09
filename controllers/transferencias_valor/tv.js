const conx = require("../../database/conx");
require("dotenv").config();
const jwt = require('jsonwebtoken');
const createjwt = require('../../middleware/authjwt');
var AWS = require('aws-sdk');
//AWS
AWS.config.update({
    region: process.env.AWS_CONTRY_S3,
    accessKeyId : process.env.AWS_ID_S3,
    secretAccessKey : process.env.AWS_KEY_S3,
})




function all(req,res,next){
  const client = new AWS.DynamoDB.DocumentClient();

  const getCharacters = async () =>{

/*
      const params = {
          "TableName": "transferencias_valor",
          "ScanIndexForward": true,
          "FilterExpression": "#DYNOBASE_mes_corte = :mes_corte",
          "ExpressionAttributeNames": {
            "#DYNOBASE_mes_corte": "mes_corte"
          },
          "ExpressionAttributeValues": {
            ":mes_corte": "agosto"
          }
        };
              
  */
          var  params ={
            "TableName": "transferencias_valor",
            "Item": {
              'nombre_entidad_que_reporta' : {N: 'laboratorios lafrancol s.'},
              'mes_transferencia' : {S: 'septiembre'}
            }
          }
         const charactes =  await client.scan(params).promise()
          console.log(charactes);
          res.send(charactes)
          return charactes;
  }

  getCharacters();

  
}

module.exports = [all];
