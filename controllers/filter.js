const Crawler =  require( '../classes/crawler');
const {crawlItem } =  require( '../classes/crawler');

module.exports.filterMoney =  function(req, res) {  

            const body = {

                keyword : req.query.search,
                sortBy : req.query.sortBy,
                order : req.query.order,
            }

            const crawler = new Crawler(body.keyword, body.order, body.sortBy);

            const urlString = crawler.getSearchURL();
            const crawlExec = crawlItem( urlString )
                        .then( (data) => {

   
                            let normalizedData = normalized (data);
                            let filteredData = filterByMoney( normalizedData, 'test', 'test');
                            filteredData = filterBySeen( filteredData, 'test', 'test');

                            payload = { status : 200 , content: { url : urlString , data : filteredData} };
                            res.status(200)
                            res.json(payload);
                        } )
                        .catch ( (err) => {
                            console.log(err);
                            payload = { status : 200 , content: { url : urlString , err : err} };
                            res.status(500)
                            res.json(payload);
                        } );

}

function normalized( data){
                               
    const normalizedData = data.filter( (el) => {

        if( el !== null ){

            // let convertedName = el.name.replace(/\n+/g, 'serba');
            // let convertedTrader = el.trader.replace(/\n+/g, 'serba');
            // let convertedLocation = el.location.replace(/\n+/g, 'serba');
            // let convertedPrice = el.price.replace(/\n+/g, 'serba');
            // let convertedSeen = el.seen.replace(/\n+/g, 'serba');

            return { 
                name: convertedName, 
                trader: convertedTrader,
                location: convertedLocation,
                price : convertedPrice,
                seen: convertedSeen,
            };
        }
    
    });

    return normalizedData;
}

function filterByMoney( data , moneyFrom, moneyTo ){

    const filteredData = data.filter( (el) => {

        if( el !== null ){
            return el.trader == 'Community';
        }
        
    });

    return filteredData;
}

function filterBySeen( data , seenFrom, seenTo ){

    const filteredData = data.filter( (el) => {

        if( el !== null ){
            return el.trader == 'Community';
        }
        
    });

    return filteredData;
}
