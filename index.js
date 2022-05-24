const express = require("express")

// MIDDLEWARE
// any function that executes after receiving a request and before sending a response is a middleware

// it has capability to use / alter both request and response

// next => move to the next middleware in line


const app = express();

var bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(express.json());
// app.use(<middleware>)
// global middleware

// app.use(ab)

function ab(req, res, next) {
    console.log("i am from middleware");
    next();
}

app.use((req, res, next) => {
    // req.body = { "random": "random" }
    // res.sendStatus(500)
    console.log("before");
    return next();
    return next({ "error": "error" });
    return;
    console.log("after");
})

app.get("/", ab, (req, res) => {
    console.log("hello");
    res.send("text me");
})

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


