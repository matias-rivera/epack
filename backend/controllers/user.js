const User = require('../models/user')

//@desc     Register a new user
//@route    POST /api/users
//@access   Public
exports.register = async (req, res) =>{
    const {name, email, password} = req.body

    //check if email is already in use
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        //return created user
        res.status(201).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
           // token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

}
