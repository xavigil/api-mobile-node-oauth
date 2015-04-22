module.exports = {
	expiresIn: 3600,
	calculateExpirationDate: function () {
		return new Date(new Date().getTime() + (this.expiresIn * 1000));
	},
	accessTokenLength: 32,
	refreshTokenLength: 32
};