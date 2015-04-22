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