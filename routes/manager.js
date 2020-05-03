
const route_craw = require('./crawRouter');

module.exports = function(app){

    app.use('/filter', route_craw);

}