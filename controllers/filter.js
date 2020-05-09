const Crawler =  require( '../classes/crawler');
const {crawlItem } =  require( '../classes/crawler');

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

function normalized( data){                  
    const normalizedData = data.filter( (el) => el!==null );
    return normalizedData
}

function filterBySeen( data , seenFrom, seenTo){

    const filteredData = data.filter( (el) => {

        const seen = el.seen.split(' ')[0] == 'Now' ? 0 : el.seen.split(' ')[0];

        if( el !== null ){
            // return el.trader == 'Community';
            return parseInt(seen) <= parseInt(seenTo) && 
                   parseInt(seenFrom) <= parseInt(seen) ;
        }
        
    });

    console.log(filteredData);
    return filteredData;
}

function filterByMoney( data , priceFrom, priceTo ){

    const filteredData = data.filter( (el) => {

        const price = el.price.split('\n')[0].replace(',', '.');


        //TODO :: fix if statements
        if( el !== null ){
            return parseFloat(price).toFixed(3) <= parseFloat(priceTo).toFixed(3) &&
                   parseFloat(priceFrom).toFixed(3) <= parseFloat(price).toFixed(3);
        }
        
    });

    return filteredData;
}
