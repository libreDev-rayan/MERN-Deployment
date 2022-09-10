const express = require('express');
const {UserRouter} = require('./server/routes/usersRouter');
const {MovieRouter} = require('./server/routes/moviesRouter');
const path = require('path');
var cors = require('cors');
require("./server/config/database.js");

const app = express();
app.use(cors())
app.use( express.urlencoded({extended:true}) );
app.use( express.json() );

//!app.use(express.static(path.join(__dirname, "/public/dist/public")))


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTION");
    next();
});

app.use( '/api/users', UserRouter );
app.use( '/api/movies', MovieRouter );

const port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log("The BackEnd server is working on port: 8080");
})
