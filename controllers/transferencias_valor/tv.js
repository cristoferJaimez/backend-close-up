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
  const TABLET_NAME =  'transferencias_valor'

  const getCharacters = async () =>{
          const params = {
              TableName : TABLET_NAME,
              KeyConditionExpression : 'codigo_cum = :codigo_cum  AND id = 1',
              //ProjectionExpression : 'tipo_identificacion_reportador, codigo_cum ',
              ExpressionAttributeValues : {
                  ':codigo_cum' : {"S" : "12345"}
              },
              Limit : 2,
              ScanIndexForward : false
          };
              
          const charactes =  await client.query(params).promise()
          console.log(charactes);
          res.send(charactes)
          return charactes;
  }

  getCharacters();

  
}

module.exports = [all];
