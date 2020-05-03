const Crawler =  require( '../classes/crawler');

module.exports.filterMoney =  function(req, res) {  

            const crawler = new Crawler('Dreugh Wax', 'asc' , 'LastSeen');

            const urlString = crawler.getSearchURL();
            crawler.crawlData();

            payload = { status : 200 , content: { url : urlString } };
            res.status(200)
            res.json(payload);
}
