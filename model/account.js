var utils = require('../utils');

var accounts = [
	{id:1, username:'sam',name:'Sam', age:19, hashedPassword:'POMCGUBiomn2VnyFw0im41rU+OLW7Ak3k0Q0fy1jCjDbiUt4v5X1apZEOCQMfuGevJHlRQafbzWa2pD07j2aAQ==', salt:'8kD/o3iDJftGXlc383G70Q==' },
	{id:2, username:'rob',name:'Robert', age:21, hashedPassword:'Uao8W95Ko1mUIgE4BIeKnFHN2KFQuAb9ExvsvZqNqZhH2UdVEWhzW1+7vtESutV4IjDOKxxBDT9v/FuAePTr0w==', salt:'p1fbRZiXGb6klmLzpDHHGw==' }
];

exports.save = function(username, name, age, password, done){
	if(!username || !password) return done(new Error('missing param'));

	var salt = utils.newSalt();
	var hashedPwd = utils.hashPassword(password, salt);

	var account = {
		id:accounts.length+1, 
		username:username,
		name:name || '',
		age:age || '', 
		hashedPassword:hashedPwd,
		salt:salt
	};
	accounts.push(account);
	done(null, account);
}

exports.findById = function(accountId, done){
	var account = null;
	for(var i=0; i<accounts.length; i++){
		if(accounts[i].id===accountId){
			account = accounts[i];
			break;
		}
	}
	done(null, account);
}

exports.findByUsername = function(username, done){
	var account = null;
	for(var i=0; i<accounts.length; i++){
		if(accounts[i].username===username){
			account = accounts[i];
			break;
		}
	}
	done(null, account);
}
