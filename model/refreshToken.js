var refreshTokens = {};

exports.save = function(token, userId, clientId, next)
{
	var refreshToken = {
		refreshToken:token,
		userId: userId,
		clientId: clientId
	};

	refreshTokens[token] = refreshToken;
	return next(null, refreshToken);
}