var passport = require('passport'),
	oauth2orize = require('oauth2orize'),
	model = require('../model'),
	utils = require('../utils'),
	config = require('../config');

var server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) 
{
	model.account.find(username,function(err,account){
		if(err) return done(err);
		if(!account) return done(null,false);
		if( account.hashedPassword !== utils.hashPassword(password,account.salt) ){
			return done(null, false);
		}

		var newToken = utils.newToken(config.token.accessTokenLength);
		var expirationDate = config.token.calculateExpirationDate();
		model.accessToken.save(newToken, expirationDate, account.id, client.id, function(err, accessToken)
		{
			if(err) return done(err);

			var newRefreshToken = utils.newToken(config.token.refreshTokenLength);
			model.refreshToken.save(newRefreshToken,account.id, client.id, function(err, refreshToken)
			{
				if(err) return done(err);

				return done(null, newToken, newRefreshToken, {expires_in: config.token.expiresIn});
			});
		});

	});
}));

exports.token = [
	passport.authenticate('basic', {session: false}),
	server.token(),
	server.errorHandler()
];
