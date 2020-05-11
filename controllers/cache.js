
const CacheHelpers = require( '../helpers/cacheHelpers');

const ttl = 60 * 5; // cache for 5Minutes
const CacheService = new CacheHelpers(ttl); // Create a new cache service instance

module.exports.setCacheKey =  function(req, res) {  

        CacheService.set('data', 'serbay acar')
        
        payload = { status : 200 , content: 'Set name :: data !!' };
        res.status(200)
        res.json(payload);
}

module.exports.getCacheKey =  function(req, res) {  

        const data = CacheService.get('data');

        payload = { status : 200 , content: data };
        res.status(200)
        res.json(payload);
}

module.exports.flushCache =  function(req, res) {  

        CacheService.flush();

        payload = { status : 200 , content: 'Flushed' };
        res.status(200)
        res.json(payload);
}
