const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const Customer = require('../models/Customers');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { CustomerRequirement } = require('../validation.js');


const validateCustomer = (req, res, next) => {
    const { error } =CustomerRequirement.validate(req.body);
    if (error) {
        // console.log(error);
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/:id', async (req,res,next) =>{
    const {id} = req.params;
    const customer= await   Customer.findById(id);
    console.log(customer);
    res.send(customer);
    
 
})

router.post('/register',validateCustomer, catchAsync(async (req,res,next) =>{
    console.log(req.body);
    req.body.customerID=uuidv4()
    const customer = new Customer(req.body)
    await customer.save();
    res.send(customer);
    
 
}))

module.exports = router;