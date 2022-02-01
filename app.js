const express = require('express');
const app = express();
if (process.env.NODE_ENV!== "production"){
    require('dotenv').config({ path:'./.gitignore/.env' });
}


app.use(express.urlencoded({extended: true}))
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

const customerRoutes=require('./routes/customer')
const orderRoutes=require('./routes/order')
const url = process.env.Dburl

const mongoose = require('mongoose');
mongoose.connect(url,{
   
});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'Connection Error'));
db.once('open',() =>{
    console.log("Database Connected");
})

app.use('/user',customerRoutes)
app.use('/',orderRoutes)

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).send(err)
   
})

app.listen(3000,()=>{
    console.log("ON port 3000")
})