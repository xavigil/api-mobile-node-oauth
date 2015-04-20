var passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy,
	ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
	oauth2 = require('./oauth2');

exports.login = oauth2.token;

exports.logout = function(req, res)
{

};

