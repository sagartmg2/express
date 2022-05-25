const express = require("express")
const path = require("path")
const { engine } = require('express-handlebars');



// MIDDLEWARE
// any function that executes after receiving a request and before sending a response is a middleware

// it has capability to use / alter both request and response

// next => move to the next middleware in line
var jwt = require('jsonwebtoken');


const app = express();


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

var bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(express.json());

app.use(express.static(path.join(__dirname, "../randColor")));

// app.use(<middleware>)
// global middleware

// app.use(ab)

// function ab(req, res, next) {
//     console.log("i am from middleware");
//     next();
// }

app.use((req, res, next) => {
    // req.body = { "random": "random" }
    // res.sendStatus(500)
    console.log("before");
    return next();
    return next({ "error": "error" });
    return;
    console.log("after");
})

// app.get("/", ab, (req, res) => {
//     console.log("hello");
//     res.send("text me");
// })

app.get("/home", (req, res) => {
    console.log("home");
    res.send("home");
})

app.post("/signup", (req, res) => {
    console.log("bodty", req.body);

    // LET NAME = REQ.BODY.NAME
    // LET AGE = REQ.BODY.AGE
    // object destructuring
    // ...rest // spread
    let { name, age, ...rest } = req.body;

    // user = user();
    // user.age = age ;

    console.log({ name });
    console.log({ age });
    console.log({ rest });

    console.log("signup");
    res.send("signup");
})

app.get("/html", (req, res) => {

    // res.send("test")

    res.sendFile(path.join(__dirname, "../randColor/html/index.html"));


})

app.get("/dynamichtml", (req, res) => {

    // User::find(1) /// {id:1, name:"afsdf",f........}

    res.render('about', {
        layout: "side",
        name: "John",
        isAdmin: false,
        arr: [{
            name: "John",
        },
        {
            name: "John2",
        },
        {
            name: "John3",
        }

        ]
    });
    // res.send("test")

    // res.sendFile(path.join(__dirname, "../randColor/html/index.html"));


})

app.get("/cookie", (req, res) => {


    // true
    // saves in database , memory

    res.cookie("key", "value");
    res.send("sent")


})

app.get("/another-cookie", (req, res) => {

    // true
    // saves in database , memory

    // res.cookie("key","value");
    res.send("sent")


})


require('dotenv').config();
// console.log( );
app.post("/login",(req,res) => {

    const{email,password}  =  req.body
    if(email == "testing@testing.com" && password== "password"){

       
        var token = jwt.sign({ id: 1,role:1,username:"name" }, process.env.SECRET);

        res.send({
            status:"success",
            token,
        })
    }else{
        res.send("wrong cred")
    }
})


function authenticate(req,res,next){
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    console.log({token});

    try{
        var decoded = jwt.verify(token, process.env.SECRET)
        if(decoded){
            next()
        }else{
            res.status(401).send("unauthenticated")
        }
    }catch(err){
        res.status(401).send("unauthenticated")

    }
    // console.log(decoded);
}


app.get("/protected",authenticate,(req,res) => {


    res.send("protected")
})



app.use((req, res, next) => {
    res.status(404).send("404 page not found")
})

app.use((err, req, res, next) => {
    console.log({ err });
    res.send("Error")
})

app.listen(8000, () => {
    console.log("listening");
})



// this is feature for naya branch




// Authentication
// // 401
//  - stateful

        //   login -> server checks for credentilas > stores session details in server itself > session_id as setCookie(session_id)
        // we can do so using session and cookie
        // browser sends the cookie with session_id 


//  - stateless
        // login -> server veries -> does not store any data 
        // instead sends a token  // encypted string with signed secret
        // manually have to send token on every request ourself as authorization header
        // 


// Authorization
//      // 403


