var express= require('express');
var router = express.Router();

var controller = require('../controllers/cache');

//GET Request
router.get('/get', controller.getCacheKey);

//POST Request
router.post('/flush', controller.flushCache);
router.post('/set', controller.setCacheKey);

module.exports = router;