const { errorHandler } = require('../helpers/dbErrorHandler')
const Order = require('../models/order')
const Client = require('../models/client')
const User = require('../models/user')



//@desc     Create a new order
//@route    POST /api/orders
//@access   Private
exports.create = (req, res) =>{
    const {user, client, tracing, price, size, weight } = req.body

    console.log(new Date())
    Client.findById({_id:client}).then(clientData => {
        if(!clientData){
            return res.status(400).json({
                error: 'Client not found'
            })
        }
        User.findById({_id:user}).then(userData => {
            if(!userData){
                return res.status(400).json({
                    error: 'Client not found'
                })
            }
            const order = new Order({
                user: userData,
                client: clientData,
                tracing: [{...tracing, date: new Date()}],
                price,
                size,
                weight
             })
             order.save((err, result) => {
                 if(err){
                     return res.status(400).json({
                         error: errorHandler(err)
                     })
                 }
                 res.status(201).json({ 
                     message: 'Order was successfully created!'
                 })
             })
                 

        })
    })
    /* tracing: [
        {
           state:{
               type: String,
               required: true
           },
           date: {
               type:Date,
               required:true
           },
           branch: {
               type:String,
               required:true
           },
           zone: {
               type:String,
               required: true,
           },
           courier: {
               type:Number,
               required:true
           }

        },
    ], */

    
    
    

}