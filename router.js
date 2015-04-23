var express = require('express'),
	oauth2 = require('./controllers/oauth2');

var controller = require('./controllers');

var authRoutes = express.Router();
authRoutes.post('/auth/token', oauth2.token);

var privateRoutes = express.Router();
privateRoutes.use( passport.authenticate('bearer', { session: false }) );
privateRoutes.get('/account/info', controller.accounts.info);


var router = express.Router();
router.use(authRoutes);
router.use(privateRoutes);

module.exports = router;