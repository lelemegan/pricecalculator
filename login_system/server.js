const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");//add bodyparser module
const session = require("express-session");
const {v4:uuidv4} = require("uuid");

const router = require('./router');

const app = express();

const port = process.env.PORT||3000;

//body parser is to serialize the date
//it is a middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs');

// load static assets
app.use('/static',express.static(path.join(__dirname,'public')))

app.use(session({
    //secret:'secret', this is not the safest
    secret: uuidv4(), //this will make the session secret and unique
    resave: false,
    saveUninitialized: true
}));

app.use('/route', router);

// home route
app.get('/',(req,res)=>{
    res.render('base',{titl:"Login System"});
})

app.listen(port, ()=>{console.log("Listening to the server on http://localhost:3000")});
