const {jwtAuth} = require('../middleware/authjwt')

 async function checkRolAuth  (req,res,next){
    try {
        const token = req.headers.autorization.split(' ').pop()
        const tokenData = await jwtAuth(token)
        if(!tokenData){
            res.send('Access denied, token expired or incorrect');
        }else{
            res.send('user ok');
        }
    } catch (error) {
        res.send('error en check rol aut')
    }
}

module.exports = [checkRolAuth]