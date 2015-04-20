var express = require('express');

var controller = require('./controllers');

var authRoutes = express.Router();
authRoutes.post('/auth/login',controller.authentication.login);
authRoutes.get('/auth/logout',controller.authentication.logout);

var privateRoutes = express.Router();
privateRoutes.get('/account/info', controller.accounts.info);


var router = express.Router();
router.use(authRoutes);
router.use(privateRoutes);

module.exports = router;