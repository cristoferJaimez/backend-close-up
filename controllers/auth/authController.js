const jwtAuth = require('../../middleware/authjwt')


function me(req, res, next) {
    res.send('me')
};


function signIn(req, res, next) {
    const data = { data: 'cristofer' }
    const jwtget = jwtAuth(data)
    res.header('authorization', jwtget).json({
        message: 'user ok',
        token: jwtget
    });
};

function signOut(req, res, next) {
    res.send('signOut')
};


module.exports = [me, signIn, signOut]