const Crawler =  require( '../classes/crawler');
const {crawlItem } =  require( '../classes/crawler');

const CacheHelpers = require( '../helpers/cacheHelpers');
const ttl = 60 * 5; // cache for 5Minutes
const CacheService = new CacheHelpers(ttl); // Create a new cache service instance

module.exports.crawlItemsFromWebsite =  function(req, res) {  

            const body = {

                keyword : req.query.search,
                sortBy : req.query.sortBy,
                order : req.query.order,
                fromPage : req.query.fromPage,
                toPage : req.query.toPage,
            }

            const crawler = new Crawler(body.keyword, body.order, body.sortBy);

            const urlString = crawler.getSearchURL();
            const crawlExec = crawlItem( urlString , body.fromPage, body.toPage)
                        .then( (data) => {

   
                            let normalizedData = normalized (data);

                            //Caching Data
                            CacheService.set('data', normalizedData)

                            payload = { status : 200 , content: { url : urlString , data : normalizedData} };
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


module.exports.filterSeen =  function(req, res) {  

    const body = {
        fromSeen : req.query.fromSeen,
        toSeen : req.query.toSeen,
    }

    let items =  CacheService.get('data')
    items = filterBySeen(items, body.toSeen, body.fromSeen)

    payload = { status : 200 , content: { data : items} };
    res.status(200)
    res.json(payload);

}

module.exports.filterPrice =  function(req, res) {  

    const body = {
        fromPrice : req.query.fromPrice,
        toPrice : req.query.toPrice,
    }

    let items =  CacheService.get('data')
    items = filterByPrice(items, body.toPrice, body.fromPrice)

    payload = { status : 200 , content: { data : items} };
    res.status(200)
    res.json(payload);

}

function normalized( data){                  
    const normalizedData = data.filter( (el) => el!==null );

    const normalizedItems = normalizedData.map( (el) => {



        const new_name = el.name.replace(/\s/g, " ").trim();
        const exacName = new_name.split('Level:')[0].trim();
        const level =  new_name.split('Level:')[1].trim();
        
        const new_trader = el.trader.replace(/\s/g, " ").trim();
        const new_location = el.location.replace(/\s/g, " ").trim();

        const new_price = el.price.replace(/\s/g, " ").trim();
        const total = new_price.split('=')[1].trim();
        const equation = new_price.split('=')[0].trim();
        const count = equation.split('X')[1].trim();
        const uniquePrice = equation.split('X')[0].trim();

        const new_seen = el.seen == 'Now' ? 0 : parseInt(el.seen.split(' ')[0].trim());
        return {
            name : exacName,
            level : level,
            trader : new_trader,
            location : new_location,
            price : { perPrice : uniquePrice, countItem: count, total: total, asString: new_price },
            seen : new_seen
        }
        
    } );

    return normalizedItems
}

function filterBySeen( data , seenFrom, seenTo){

    const filteredData = data.filter( (el) => {

        const seen = el.seen.split(' ')[0] == 'Now' ? 0 : el.seen.split(' ')[0];

        if( el !== null ){
            //Filtering
            return parseInt(seen) <= parseInt(seenTo) && 
                   parseInt(seenFrom) <= parseInt(seen) ;
        }
        
    });

    console.log(filteredData);
    return filteredData;
}

function filterByPrice( data , priceFrom, priceTo ){

    const filteredData = data.filter( (el) => {

        const price = el.price.split('\n')[0].replace(',', '.');
        // Filtering
        //TODO :: fix if statements
        if( el !== null ){
            return parseFloat(price).toFixed(3) <= parseFloat(priceTo).toFixed(3) &&
                   parseFloat(priceFrom).toFixed(3) <= parseFloat(price).toFixed(3);
        }
        
    });

    return filteredData;
}
