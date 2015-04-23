var refreshTokens = {};

exports.save = function(token, userId, clientId, done)
{
	var refreshToken = {
		refreshToken:token,
		userId: userId,
		clientId: clientId
	};

	refreshTokens[token] = refreshToken;
	return done(null, refreshToken);
}