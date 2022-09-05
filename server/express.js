const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth-route');
const mainRoute = require('./routes/main-route');
const companyRoute = require('./routes/company-route');
const productRoute = require('./routes/product-route');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials : true
}));

//db
mongoose.connect(process.env.DB_ADDRESS,{useNewUrlParser:true,useUnifiedTopology:true}, (err)=> {
    if(err) return console.log(err.message);
    console.log('Mongoose connected!');
});

//routes
app.use('/auth', authRoute); //authRoute
app.use(mainRoute); //mainRoute
app.use('/company', companyRoute); //companyRoute
app.use('/product', productRoute); //productRoute

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`localhost:${port} is active!`);
})