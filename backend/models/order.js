const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Client'
    },
    tracing: [
        {
           state:{
               type: String,
               required: true
           },
           date: {
               type:Date
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
        }
    ],
    price: {
        type:Number,
        required:true,
        default:0
    },
    size: {
        type: Number,
        required:true,
        default: 0
    },
    weight: {
        type: Number,
        required:true,
        default: 0
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order