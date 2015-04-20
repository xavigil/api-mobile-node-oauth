var express = require('express');
	bodyParser = require('body-parser'),
	passport = require('passport'),
	router = require('./router');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

var port = process.env.PORT || 3000;

app.use('/api', router);

app.listen(port, function(){
	console.log('Server listening on port',port);
});