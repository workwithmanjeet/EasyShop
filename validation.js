const Joi = require('joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));
const joiPostalCode = Joi.extend(require('joi-postalcode'))
const {  number } = require('joi');

module.exports.CustomerRequirement = Joi.object({
    customername: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNo: myCustomJoi.string().phoneNumber().required(),
    city: Joi.string().required(),
    

}).required();

module.exports.ProductRequirement = Joi.object({
    productname: Joi.string().required(),
    quantity: Joi.number().required().min(1),
    pricing: Joi.number().less(Joi.ref('MRP')).required(),
    MRP: Joi.number().required()
    

}).required();

module.exports.ShippingRequirement = Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    pincode: joiPostalCode.string().postalCode('IN').required(),
   
    

}).required();