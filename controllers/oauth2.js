var passport = require('passport'),
	oauth2orize = require('oauth2orize');

var server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) 
{
	
}));

exports.token = [
	passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
	server.token(),
	server.errorHandler()
];
