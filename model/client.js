
var clients = [{
	id:1,
	client_id:'iOS',
	client_secret:'iOS secret'
},
{
	id:2,
	client_id:'Android',
	client_secret:'android secret'
}];

exports.find = function(clientId, next)
{
	var result = null;
	for(var i=0; i<clients.length; i++){
		if(clients[i]===clientId){
			result = clients[i];
			break;
		}
	}
	next(null, result);
};
