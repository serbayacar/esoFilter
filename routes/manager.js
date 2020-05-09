
const route_craw = require('./crawRouter');
const route_cache = require('./cacheRouter');

module.exports = function(app){

    app.use('/filter', route_craw);
    app.use('/cache', route_cache);

}