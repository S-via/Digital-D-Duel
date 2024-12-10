const jwt = require('jsonwebtoken')

const secret = '2a11a9a92517ee1c3eeb6164733aeb0aba22aec4fdeece8f41bbc63d894263ed'
const expiration = '2h';

module.exports = {
    authMiddleware: function({req}){
        let token = req.body.token ||req.query.token || req.headers.authorization;

        if(req.headers.authorization){
            token = token.split(' ').pop().trim();
        }
        if(!token){
            return req;
        }
        try{
            const{data} = jwt.verify(token,secret,{maxAge:expiration});
            req.user= data;
        } catch{
            console.log('token not valid');
            throw new Error("Token is not valid")
        }
        return req;
    },
    signToken: function({username,email,_id}){
        const payload ={username,email,_id};

        return jwt.sign({data:payload},secret,{expiresIn:expiration});
    }
}
