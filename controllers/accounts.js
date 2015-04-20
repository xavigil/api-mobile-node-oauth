exports.info = function(req, res){
	res.status(200).send({
		username:'Sam',
		age:19
	});
}