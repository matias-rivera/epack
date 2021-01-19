const { errorHandler } = require('../helpers/dbErrorHandler')
const generateToken = require('../helpers/generateToken')
const User = require('../models/user')


//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Public
exports.login = (req, res) =>{
    const {email, password} = req.body

    //check if email is already in use
    User.findOne({email}).exec((err, user) => {
        //if user exist and entered password is the same
        if(user){
            user.matchPassword(password).then((result) => {
                if(result){
                    res.json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        token: generateToken(user._id)
                    })
                }
                else{
                    return res.status(400).json({
                        error: 'Invalid email or password'
                    })
                }
            })
            
        }else{
            return res.status(400).json({
                error: 'Invalid email or password'
            })
        }
        
    })

    
}


//@desc     Register a new user
//@route    POST /api/users
//@access   Public
exports.register = (req, res) =>{
    const {name, email, password} = req.body

    //check if email is already in use
    User.findOne({email}).exec((err, user) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        if(user){
            return res.status(400).json({
                error: 'User already exists'
            })
        }else{
            const user = new User({
                name,
                email,
                password
            })
            user.save((err, user) => {
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                res.status(201).json({ 
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id)
                })
            })
        }
    })


    

}


//@desc     Get all users
//@route    GET /api/users
//@access   Private/admin
exports.readAll = async (req, res) =>{
    const users = await User.find({}).select('-password')
    res.json(users)
}


//@desc     Get all users
//@route    GET /api/users
//@access   Private/admin
exports.read = (req, res) =>{
    User.findById(req.params.id).select('-password').exec((err, user) => {
        if(err){
            return res.status(400).json({
                error: 'User not found'
            })
        }
        return res.json(user)
    })

    
}


//@desc     Update user
//@route    PUT /api/users/:id
//@access   Private/admin
exports.update = (req, res) =>{
    
    User.findById(req.params.id).exec((err, user) => {
        if(err){
            return res.status(400).json({
                error: 'User not found'
            })
        }
        
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.isAdmin = req.body.isAdmin || user.isAdmin 
         
            user.save((err, result) => {
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                res.json({message:'user was updated successfully'})
            })
    
        
        
    })

    
}


//@desc     Delete user
//@route    DELETE /api/users/:id
//@access   Private/admin
exports.remove = (req, res) =>{
    User.findById(req.params.id).exec((err, user) => {
        if(err){
            return res.status(400).json({
                error: 'User not found'
            })
        }
        user.remove().exec((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({ message: 'User removed'})
        })
    })
    
}
