const express = require('express');
const router = express.Router();
const Customer = require('../models/Customers');
const Order = require('../models/Orders');
const Shipping = require('../models/Shipping');
const { v4: uuidv4 } = require('uuid');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { ProductRequirement,ShippingRequirement } = require('../validation.js');



const validateProduct = (req, res, next) => {
    const { error } =ProductRequirement.validate(req.body);
    if (error) {
        // console.log(error);
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
const validateShipping = (req, res, next) => {
    const { error } =ShippingRequirement.validate(req.body);
    if (error) {
        // console.log(error);
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/orders/all', async (req,res,next) =>{
    const result=  await Customer.find({}).populate({ path: 'purchaseorder', model: Order,populate :{ path: 'shipping', model: Shipping } })
    
    res.send(result);
    
 
})

router.get('/orders/filter', async (req,res,next) =>{
   
    const result=  await Shipping.find({city:req.query.city}) 
    let clist=[];
    let plist=[];
    for (let ele of result){
        clist.push(ele.customerID)
        plist.push(ele.purchaseID)
    }
    console.log(result)
    console.log(clist)
    console.log(plist)
    const ans= await Customer.find({ 'customerID': { $in: clist } }).populate( {path: 'purchaseorder', model: Order , match: { purchaseID:{ $in :plist} }})

    res.send(ans);
 
})







router.post('/user/:uid/order',validateProduct,catchAsync( async (req,res,next) =>{
    console.log(req.body);
    const {uid} = req.params;
    const customer = await Customer.findById(req.params.uid)
    req.body.customerID= customer.customerID
    req.body.purchaseID=uuidv4()
    const order = new Order(req.body)
    customer.purchaseorder.push(order);
    await customer.save();
    await order.save();
    res.send(customer);
    
 
}))
router.post('/user/:uid/order/:oid/shipping',validateShipping,catchAsync(async (req,res,next) =>{
    console.log(req.body);
    const {uid,oid} = req.params;
    const order = await Order.findById(req.params.oid)
    console.log(order)
    req.body.customerID = order.customerID;
    req.body.purchaseID = order.purchaseID;
    const shipping = new Shipping(req.body)
    order.shipping=shipping
    await shipping.save();
    await order.save();
    console.log(order)
    res.send(order);
 
}))

module.exports = router;