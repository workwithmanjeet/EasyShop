const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const orders = require('./Orders')

const CustomerSchema = new mongoose.Schema({
    customername :{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required: true,
        
    },
    mobileNo :{
        type: Number,
        required: true,
        
    },
    city :{
        type: String,
        required: true,
        
    },
    customerID :{
        type: String,
        required: true,
        unique: true
    },
    purchaseorder : [
        {
            type:Schema.Types.ObjectId,
            ref: 'orders'
        }
    ]

})



module.exports =mongoose.model('Customer',CustomerSchema)



