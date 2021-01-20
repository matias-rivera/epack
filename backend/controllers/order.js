const { errorHandler } = require('../helpers/dbErrorHandler')
const Order = require('../models/order')
const User = require('../models/user')

//@desc     Create a new order
//@route    POST /api/orders
//@access   Private
exports.create = (req, res) =>{
    const {user, client, shippingAddress, tracing, price, size, weight } = req.body

    User.findById({_id:user}).then(userData => {
        if(!userData){
            return res.status(400).json({
                error: 'Client not found'
            })
        }
        const order = new Order({
            user: userData,
            client,
            shippingAddress,
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
    
}

//@desc     Get a order
//@route    GET /api/orders/:id
//@access   Public
exports.read = (req, res) =>{
    Order.findById(req.params.id).exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: 'Order not found'
            })
        }
        return res.json(order)
    })

    
}


//@desc     Get all orders
//@route    GET /api/orders
//@access   Private
exports.readAll = async (req, res) =>{
    const orders = await Order.find({})
    res.json(orders)
}


//@desc     Update order
//@route    PUT /api/orders/:id
//@access   Private/admin
exports.update = (req, res) =>{
    //const {client, shippingAddress, tracing, price, size, weight } = req.body

    Order.findById(req.params.id).exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: 'Order not found'
            })
        }

        const tracingUpdated = req.body.tracing ? [...order.tracing, {...req.body.tracing, date: new Date()}] : order.tracing
        order.client = req.body.client || order.client
        order.shippingAddress = req.body.shippingAddress || order.shippingAddress
        order.tracing = tracingUpdated        
        order.price = req.body.price || order.price
        order.size = req.body.size || order.size
        order.weight = req.body.weight || order.weight
    
        order.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({message:'Order was updated successfully'})
        })
        
        
    })

    
}

//@desc     Delete order
//@route    DELETE /api/orders/:id
//@access   Private
exports.remove = (req, res) =>{
    Order.findById(req.params.id).exec(async (err, order) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        await order.remove()
        res.json({
            message: 'Order deleted successfully'
        })
    })
    
}

