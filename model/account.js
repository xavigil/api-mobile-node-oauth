var users = {
	'sam':{id:1, username:'sam',name:'Sam', age:19, hashedPassword:'POMCGUBiomn2VnyFw0im41rU+OLW7Ak3k0Q0fy1jCjDbiUt4v5X1apZEOCQMfuGevJHlRQafbzWa2pD07j2aAQ==', salt:'8kD/o3iDJftGXlc383G70Q==' },
	'rob':{id:2, username:'rob',name:'Robert', age:21, hashedPassword:'Uao8W95Ko1mUIgE4BIeKnFHN2KFQuAb9ExvsvZqNqZhH2UdVEWhzW1+7vtESutV4IjDOKxxBDT9v/FuAePTr0w==', salt:'p1fbRZiXGb6klmLzpDHHGw==' }
};

exports.find = function(username, next){
	return next(null, users[username]);
}
