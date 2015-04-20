
var tokens = {};

exports.save = function(token, expirationDate, userId, clientId, next)
{
	var accessToken = {
		accesToken:token,
		expirationDate: expirationDate,
		userId: userId,
		clientId: clientId
	};
	tokens[token] = accessToken;
	next(null, accessToken);
}