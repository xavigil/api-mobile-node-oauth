var passport = require('passport'),
	oauth2orize = require('oauth2orize'),
	model = require('../model'),
	utils = require('../utils'),
	config = require('../config');

var server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) 
{
	model.account.findByUsername(username,function(err,account){
		if(err) return done(err);
		if(!account) return done(null,false);
		if( account.hashedPassword !== utils.hashPassword(password,account.salt) ){
			return done(null, false);
		}
		newAccessToken(account.id, client.id, done);
	});
}));

server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done)
{
	model.refreshToken.find(refreshToken, function(err, token){
		if(err) return done(err);
		if(!token) return done(null, false);
		if(token.clientId !== client.id ) return done(null, false);

		var newToken = utils.newToken(config.token.accessTokenLength);
		var expirationDate = config.token.calculateExpirationDate();
		model.accessToken.save(newToken, expirationDate, token.userId, token.clientId, 
			function(err, accessToken)
			{
				if(err) return done(err);
				if(!accessToken) return done(null, false);
				return done(null, accessToken.accessToken, null, {expires_in: config.token.expiresIn});
			});
	});
}));

function newAccessToken(userId, clientId, done){
	var newToken = utils.newToken(config.token.accessTokenLength);
	var expirationDate = config.token.calculateExpirationDate();
	model.accessToken.save(newToken, expirationDate, userId, clientId, function(err, accessToken)
	{
		if(err) return done(err);

		var newRefreshToken = utils.newToken(config.token.refreshTokenLength);
		model.refreshToken.save(newRefreshToken, userId, clientId, function(err, refreshToken)
		{
			if(err) return done(err);

			return done(null, newToken, newRefreshToken, {expires_in: config.token.expiresIn});
		});
	});
}

exports.newAccessToken = newAccessToken;

exports.token = [
	passport.authenticate('basic', {session: false}),
	server.token(),
	server.errorHandler()
];
