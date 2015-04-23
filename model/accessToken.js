
var tokens = {};

exports.save = function(token, expirationDate, userId, clientId, done)
{
	var accessToken = {
		accessToken:token,
		expirationDate: expirationDate,
		userId: userId,
		clientId: clientId
	};
	tokens[token] = accessToken;
	done(null, accessToken);
}

exports.find = function(token, done)
{
	return done(null,tokens[token]);
}

exports.delete = function(token, done)
{
	delete tokens[token];
	return done(null);
}