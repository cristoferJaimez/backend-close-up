const express = require('express')
const app = express();
const cors =  require('cors')
const router = require('./routers/router')

const bodyParser = require('body-parser')
const expressFile = require('express-fileupload')


//settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(express.json())
app.use(cors())
app.use(expressFile())
app.use((req,res,next) =>{
    console.log(req.url, req.method);
    next(); 
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


//routes
app.use(router);


//listen server
app.listen( app.get('port'), () => {
    console.log( "server on port, ",  app.get('port'))
} )


