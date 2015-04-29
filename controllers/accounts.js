var model = require('../model'),
	oauth2 = require('./oauth2'),
	utils = require('../utils');

exports.createAccount = function(req, res){
	if(!req.body.username || !req.body.password) 
		return res.sendStatus(400);

	model.account.findByUsername(req.body.username, function(err,account){
		if(err) return res.sendStatus(500);
		if(account) return res.status(400).send('Existing username');
		model.account.save(
			req.body.username,
			req.body.name,
			req.body.age,
			req.body.password,
			function(err, account)
			{
				if(err) return res.sendStatus(500);
				oauth2.newAccessToken(account.id, req.user.id, 
					function(err,accessToken,refreshToken,params){
						var tok = {};
						tok.access_token = accessToken;
						if (refreshToken) { tok.refresh_token = refreshToken; }
						if (params) { utils.mergeObjects(tok, params); }
						tok.token_type = 'Bearer';

						res.status(201).send(tok);
					});
			});
	});
}

exports.info = function(req, res){
	var account = JSON.parse(JSON.stringify(req.user)); // Clone req.user
	delete account.salt;
	delete account.hashedPassword;
	res.status(200).send(account);
}