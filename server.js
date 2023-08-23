require("dotenv").config();
const express = require('express');  
const morgan = require("morgan")
const helmet=require("helmet")
const session=require("express-session")
const app = express();
const port = process.env.port || 8000

const Book = require("./models/Book")

app.use(express.json())
app.use(morgan("combined"))
app.use(helmet())
app.use(session({
    secret : 'secret',
    resave: false,
    saveUninitialized:false
}));
app.use(express.urlencoded({ extended: true }));

app.post("/login",(req,res)=>{
    console.log("hello1");
    console.log(req.body.username);
    console.log(req.body.password);



    if(req.body.username=="Admin" && req.body.password=="pass")
    {
        console.log("hello");
        req.session.username=req.body.username;
        req.session.loggedin=true;

        res.status(200).json({data:"sucess"})
    }
    else{
        res.status(401).send("error")
    }

})

function validate_session(req,res,next){
    if(req.session.loggedin==true)
    {
        next();
    }
    else{
        return res.status(401).send("Not authorized")
    }
}

const Bookrouter = require("./router/Bookroute")
app.use("/books",validate_session,Bookrouter)


app.listen(port,()=>{
    console.log(`Server Running on ${port}`);
});