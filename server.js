/**
 * Created by DMehta on 1/2/2017.
 */
var express=require('express');
var mongoose=require('mongoose');
var  autoIncrement = require('mongoose-auto-increment');
var bodyParser = require('body-parser');
var database=require('./config/database');
var port  	= process.env.PORT || 7777;

mongoose.connect(database.URL);
autoIncrement.initialize(mongoose);

var app=express();

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 									// parse application/json



require('./App_Start/routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);




