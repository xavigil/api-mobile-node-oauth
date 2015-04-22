var passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy,
	oauth2 = require('./oauth2'),
	model = require('../model');

exports.login = oauth2.token;

exports.logout = function(req, res)
{

};

passport.use(new BasicStrategy(
	function(username, password, next){
		model.client.find(username, function(err,client)
		{
			if(err) return next(err);
			if(!client) return next(null,false);
			if(client.clientSecret !== password) return next(null,false);

			return next(null, client);
		});
	}
));
