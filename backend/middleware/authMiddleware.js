const User = require('../models/user')
const jwt = require('jsonwebtoken')


//check token
exports.protect = async (req, res, next) => {
    let token

    //if token is in headers
    if(
        req.headers.authorization 
        && req.headers.authorization.startsWith('Bearer')
        )
        {
            
            try{
                //get the token from header
                //[0] = Bearer , [1] = token
                token = req.headers.authorization.split(' ')[1]
                //verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                
                //get user and remove password
                req.user = await User.findById(decoded.id).select('-password')
                
                next()
            } catch(err){
                console.error(err)
                res.status(400).json({error: 'Not authorized, token failed'})
               
            }

    }

    
    if(!token){
        res.status(400).json({error: 'Not authorized, token failed'})
    }
    
}

exports.admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(400).json({error: 'Not authorized, token failed'})
    }

}

