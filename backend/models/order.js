const mongoose = require('mongoose')


const trace = mongoose.Schema(
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
,{ _id : false, required: true });

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    client: {
        dni:{type: Number,required: true},
        name: {type: String,required: true},
        phone:{type: Number},
        email:{type: String}
    },
    shippingAddress: {
        address: {type:String,required:true},
        city: {type:String,required:true},
        postalCode: {type:String,required:true},
        country: {type:String,required:true},
        note: {type:String}
    },
    tracing: [
        trace
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