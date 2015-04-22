
var clients = [{
	id:1,
	clientId:'iOS',
	clientSecret:'iOS secret'
},
{
	id:2,
	clientId:'Android',
	clientSecret:'android secret'
}];

exports.find = function(clientId, next)
{
	var result = null;
	for(var i=0; i<clients.length; i++){
		if(clients[i].clientId===clientId){
			result = clients[i];
			break;
		}
	}
	next(null, result);
};
