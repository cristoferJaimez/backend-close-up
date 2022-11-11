require("dotenv").config();
const AWS = require("aws-sdk");
//conex a S3 AWS
//AWS S3
//star conex S3
const S3 = new AWS.S3({
  region: process.env.AWS_CONTRY_S3,
  credentials: {
    accessKeyId: process.env.AWS_ID_S3,
    secretAccessKey: process.env.AWS_KEY_S3,
  },
});



function data(req, res, next) {

 

  const query = `SELECT *  FROM S3Object s WHERE s.UTC Like '${req.params.id}' `;
  const bucket = process.env.AWS_BUCKET_NAME;
  const key = 'data/Extraccion_Grupo_Proveedor_Completo_202209.csv';

  const params = {
    Bucket: bucket, 
    Key: key,
    ExpressionType: 'SQL',
    Expression: query,
    InputSerialization: {
      CSV: {
        FileHeaderInfo: 'USE',
        FieldDelimiter: '|',
      }, CompressionType: 'NONE'
    },
    OutputSerialization: {
      JSON: {
        RecordDelimiter: ',',
      },
    },
  }


  var datos = [];
  S3.selectObjectContent(params, (err, data) => {
    data.Payload.on('data', (event) => {
      try {
        if (event.Records) {
          datos.push(event.Records.Payload);
        } else if (event.Progress) {
        }
      } catch (error) {
        //console.log(error);
      }
    }).on('end', () => {
      let payload = Buffer.concat(datos).toString('utf8');
      payload = payload.replace(/,$/, '');
      let output = JSON.parse(`[${payload}]`);
      if(output.length > 0){ 
      res.json(output)}else{
        res.json({
          status: 200,
          msm: 'Provider Code Does Not Exist!..',
          face : ':('
        })
      }
    });
  });//end s3
}




module.exports = [data];
