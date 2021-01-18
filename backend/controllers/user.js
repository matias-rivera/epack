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


//@desc     Get all users
//@route    GET /api/users
//@access   Private/admin
exports.read = async (req, res) =>{
    const users = await User.find({}).select('-password')
    res.json(users)
}


//@desc     Update user
//@route    PUT /api/users/:id
//@access   Private/admin
exports.update = async (req, res) =>{
    
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin 
     
        const updatedUser = await user.save()

        res.json({message:'user was updated successfully'})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}


//@desc     Delete user
//@route    DELETE /api/users/:id
//@access   Private/admin
exports.remove = async (req, res) =>{
    const user = await User.findById(req.params.id)
    
    if(user) {
        await user.remove()
        res.json({ message: 'User removed'})
    } else {
        res.status(404)
        throw new Error('User not found')
    }

    
}
