const express = require('express');
const app = express();
const path = require("path");
const hbs = require('hbs')
require("./db/conn");
const User = require("./models/usermessage");
const port = process.env.PORT || 3000;

// setting the path
const staticpath = path.join(__dirname, "../public");
const templatespath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

// middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dis/css")))
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dis/js")))
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")))
app.use(express.static(staticpath));

app.use(express.urlencoded({
    extended: false
}))

app.set("view engine", "hbs")
app.set("views", templatespath);
hbs.registerPartials(partialpath);
// Define a route to handle the root URL
app.get('/', (req, res) => {
    res.render("index");
});

app.post('/contact',async(req, res)=>{
    try{
        // res.send(req.body)
        const userData = new User(req.body);
        await userData.save()
        res.status(201).render('index');

    }
    catch(error){
        res.status(500).send(error);

    }
})

// Start the server
app.listen(port, () => {
    console.log("Server is started...");
});
