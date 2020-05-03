const Crawler =  require( '../classes/crawler');

module.exports.filterMoney =  function(req, res) {  

            const crawler = new Crawler('Dreugh Wax', 'asc' , 'LastSeen');

            const urlString = crawler.getSearchURL();
            const data = crawler.crawlData();

            payload = { status : 200 , content: { url : urlString , data : data} };
            res.status(500)
            res.json(payload);


}
