const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    dni:{
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone:{
        type: Number
    },
    email:{
        type: String
    },
    address: {type:String,required:true},
    city: {type:String,required:true},
    postalCode: {type:String,required:true},
    country: {type:String,required:true},
    note: {type:String}

    
   
},{
    timestamps: true
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client