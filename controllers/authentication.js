var passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy,
	BearerStrategy = require('passport-http-bearer').Strategy,
	model = require('../model');

passport.use(new BasicStrategy(
	function(username, password, next)
	{
		model.client.find(username, function(err,client)
		{
			if(err) return next(err);
			if(!client) return next(null,false);
			if(client.clientSecret !== password) return next(null,false);

			return next(null, client);
		});
	}
));

passport.use(new BearerStrategy(
	function(accessToken, done)
	{
		model.accessToken.find(accessToken, function(err, token){
			if(err) return done(err);
			if(!token) return done(null, false);
			if (new Date() > token.expirationDate){
				model.accessToken.delete(accessToken, function(err){
					if(err) return done(err);
					return done(null,false);
				});
			}
			else{
				model.account.findById(token.userId, function(err, account){
					if(err) return done(err);
					if(!account) return done(null,false);
					return done(null, account, {scope:'all'});
				});
			}
		});
	}
));