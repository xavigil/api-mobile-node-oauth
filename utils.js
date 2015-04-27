var crypto = require('crypto');

exports.newSalt = function (){
	return crypto.randomBytes(16).toString('base64');
}

exports.hashPassword = function(password,salt){
	return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
}

exports.newToken = function(len){
	return crypto.randomBytes(len).toString('hex');
}

exports.mergeObjects = function(a, b)
{
	if (a && b) {
		for (var key in b) {
			a[key] = b[key];
		}
	}
	return a;
};