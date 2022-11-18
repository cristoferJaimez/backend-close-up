const express = require('express')
const app = express();
const cors =  require('cors')


//routes
const router = require('./routers/auth/auth')
const router_tv = require('./routers/dashBoard/transferencias_valor/tv')
const router_maps = require('./routers/maps/index')
const router_ad = require('./routers/analitydata/index')
const router_map_ad = require('./routers/maps/chart/index')



const bodyParser = require('body-parser')
const expressFile = require('express-fileupload')

//conx
const con = require('./database/conx.js')


const key = require('./config/key')

//settings
app.set('port', process.env.PORT || 3000)

//middlewares

app.use(cors())
app.use(expressFile())
app.use((req,res,next) =>{
    console.log(req.url, req.method);
    next(); 
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.set('key', key.key);
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use(router);
app.use(router_tv);
app.use(router_maps);
app.use(router_ad);
app.use(router_map_ad)

//listen server
app.listen( app.get('port'), () => {
    console.log( "server on port, ",  app.get('port'))
} )


