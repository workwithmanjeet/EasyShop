const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const shippings = require('./Shipping')


const OrderSchema = new mongoose.Schema({
    productname :{
        type: String,
        required: true,
    },
    quantity :{
        type: Number,
        required: true,
        
    },
    pricing :{
        type: Number,
        required: true,
        
    },
    MRP :{
        type: Number,
        required: true,
        
    },
    purchaseID :{
        type: String,
        required: true,
        unique: true
    },
    customerID :{
        type: String,
        required: true,
    },
    shipping :{
        type:Schema.Types.ObjectId,
        ref: 'shippings',
        
    }
    

})



module.exports =mongoose.model('Order',OrderSchema)