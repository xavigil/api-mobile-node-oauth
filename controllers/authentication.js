var passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy,
	ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
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

			return(null, client);
		});
	}
));

passport.use(new ClientPasswordStrategy(
	function(clientId, clientSecret, next){
		model.client.find(clientId, function(err,client)
		{
			if(err) return next(err);
			if(!client) return next(null,false);
			if(client.clientSecret !== clientSecret) return next(null,false);

			return(null, client);
		});
	}
));