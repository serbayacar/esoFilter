const Crawler =  require( '../classes/crawler');
const {crawlItem } =  require( '../classes/crawler');

module.exports.filterMoney =  function(req, res) {  

            const crawler = new Crawler('Dreugh Wax', 'asc' , 'LastSeen');

            const urlString = crawler.getSearchURL();
            const crawlExec = crawlItem( urlString )
                        .then( (data) => {
                            payload = { status : 200 , content: { url : urlString , data : data} };
                            res.status(200)
                            res.json(payload);
                        } )
                        .catch ( (err) => {

                            payload = { status : 200 , content: { url : urlString , err : err} };
                            res.status(500)
                            res.json(payload);
                        } );

}
