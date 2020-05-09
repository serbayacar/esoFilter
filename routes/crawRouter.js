var express= require('express');
var router = express.Router();

var controller = require('../controllers/filter');

//GET Request
router.get('/money', controller.crawlItemsFromWebsite);

module.exports = router;