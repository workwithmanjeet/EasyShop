const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ShippingSchema = new Schema({
    address: String,
    city : String,
    pincode : Number,
    purchaseID :{
        type: String,
        required: true,
       
    },
    customerID :{
        type: String,
        required: true,
    }
 
});


module.exports =mongoose.model('Shipping',ShippingSchema);
