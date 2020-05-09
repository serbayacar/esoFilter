const parser = require('body-parser');
const express = require('express');
const app= express();
const NodeCache = require( "node-cache" );
const cacheStore = new NodeCache();

app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

require('./routes/manager')(app);

app.listen(3000, "127.0.0.1");