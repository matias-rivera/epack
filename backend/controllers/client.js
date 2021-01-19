const { errorHandler } = require('../helpers/dbErrorHandler')
const Client = require('../models/client')


//@desc     Register a new user
//@route    POST /api/clients
//@access   Public
exports.create = (req, res) =>{
    const {dni, name, phone, email, address, city, postalCode, country, note } = req.body

    //check if email is already in use
    Client.findOne({dni}).then(client => {

        if(client){
            return res.status(400).json({
                error: 'Client already exists'
            })
        }else{
            const client = new Client({
                dni,
                name,
                phone,
                email,
                address,
                city,
                postalCode,
                country,
                note
            })
            client.save((err, user) => {
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                res.status(201).json({ 
                    message: 'Client was successfully created!'
                })
            })
        }
    })

}


//@desc     Get all clients
//@route    GET /api/clients
//@access   Private
exports.readAll = async (req, res) =>{
    const clients = await Client.find()
    res.json(clients)
}


//@desc     Get a specific client
//@route    GET /api/clients/:id
//@access   Private
exports.read = (req, res) =>{
    Client.findOne(req.params.dni).exec((err, client) => {
        if(err){
            return res.status(400).json({
                error: 'Client not found'
            })
        }
        return res.json(client)
    })
}


//@desc     Update client
//@route    PUT /api/clients/:id
//@access   Private
exports.update = (req, res) =>{
    
    Client.findById(req.params.id).exec((err, client) => {
        if(err){
            return res.status(400).json({
                error: 'Client not found'
            })
        }
            client.name = req.body.name || client.name
            client.phone = req.body.phone || client.phone
            client.email = req.body.email || client.email
            client.address = req.body.address || client.address
            client.city = req.body.city || client.city
            client.postalCode = req.body.postalCode || client.postalCode
            client.country = req.body.country || client.country
            client.note = req.body.note || client.note
         
            client.save((err, result) => {
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                res.json({message:'Client was updated successfully'})
            })
    
        
        
    })

    
}


//@desc     Delete user
//@route    DELETE /api/users/:id
//@access   Private/admin
exports.remove = (req, res) =>{
    Client.findOneAndRemove(req.params.id).exec((err, client) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'Client deleted successfully'
        })
    })
    
}
