const express = require('express')
const app = express();
const cors =  require('cors')
const router = require('./routers/auth/auth')

const bodyParser = require('body-parser')
const expressFile = require('express-fileupload')

const con = require('./database/conx.js')

//settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
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


