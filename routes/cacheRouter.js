var express= require('express');
var router = express.Router();

var controller = require('../controllers/cache');

//GET Request
router.post('/setCache', controller.setCache);

module.exports = router;