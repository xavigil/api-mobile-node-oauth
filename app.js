var express = require('express');
	bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'welcome!' });
});

app.use('/api', router);

app.listen(port, function(){
	console.log('Server listening on port',port);
});