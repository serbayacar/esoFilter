var express= require('express');
var router = express.Router();

var controller = require('../controllers/filter');

//GET Request
router.get('/money', controller.filterSeen);


//POST Request
router.post('/crawl', controller.crawlItemsFromWebsite);

module.exports = router;