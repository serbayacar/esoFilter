var express= require('express');
var router = express.Router();

var controller = require('../controllers/filter');

//GET Request
router.get('/seen', controller.filterSeen);
router.get('/money', controller.filterPrice);

//POST Request
router.post('/crawl', controller.crawlItemsFromWebsite);

module.exports = router;