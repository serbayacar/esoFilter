const puppeteer = require('puppeteer');
const httpBuildQuery = require('http-build-query');


const urlScheme = 'https://eu.tamrieltradecentre.com/pc/Trade/SearchResult';

const tableSelector = '.trade-list-table';
const cursorSelector = '.cursor-pointer';
const firstChildSelector = 'td:first-child';
const tableDecSelector = 'td';


class Crawler{
    constructor( keyword = '', order = false, sortBy = false)
    {
        this.scheme = urlScheme;
        this.order = order;
        this.sortBy = sortBy;
        this.keyword = keyword;
        this.startPage = 0;
        this.toPage = 10;


        this.searchURL = this.getSearchURL();
        this.itemJson = false;
    }

    setScheme( url ){
        this.scheme = url;
    }

    setKeyword( keyword ){
        this.keyword = keyword;
    }

    setOrder( order ){
        this.order = order;
    }

    setSortBy( by ){
        this.sortBy = by;
    }


    setPages( from, to ){
        this.startPage = from;
        this.toPage = to;
    }

    getSearchURL() {
        // https://eu.tamrieltradecentre.com/pc/Trade/SearchResult?ItemNamePattern=Dreugh+Wax&SortBy=LastSeen&Order=asc
        const queries = { 'ItemNamePattern' : this.keyword , 'SortBy' : this.sortBy , 'Order' : this.order };
        return this.scheme + '?' + httpBuildQuery(queries);
    }

    getPageURL( page ) {
        const queries = { 'page' : page  };
        return this.searchURL + httpBuildQuery(queries);
    }

    crawlData() {

        const data= crawl( this.searchURL );
        this.itemJson = data;
        return data;
       
    }

    getItems( isArray = false) {
        let items = this.itemJson;
        if( isArray ){
            items = [ this.itemJson ]
        }

        return items;
    }

}

async function crawl( searchURL ) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(searchURL, { waitUntil : 'networkidle0' });
            
    console.log('Page Loaded  :: ' + searchURL);

    await page.screenshot({ path: 'test.png' });
    // console.log('Getting Items .....');

    // const items = await page.evaluate(() => {

    //     const tableWrapper = document.querySelector( tableSelector );
    //     const itemRows = tableWrapper.querySelectorAll( cursorSelector );

           
    //     const itemJsons = Object.values(itemRows).map( (el) => {

    //         if(el.querySelector( firstChildSelector ) !== null) {
    //             const tds = el.querySelectorAll( tableDecSelector );
            
    //             const name = tds[0].innerText;
    //             const trader = tds[1].innerText;
    //             const location  = tds[2].innerText;
    //             const price  = tds[3].innerText;
    //             const seen  = tds[4].innerText;

    //             return { name: name, trader: trader, location: location, price : price, seen: seen };
    //         }

    //         });

    //     return itemJsons;
    // });

    // console.log('Filtering Items .....');
    // const fileteredItems = items.filter( (el) => {
    //     return typeof(el) !== 'undefined'
    // });

    // //Close browser
    // await browser.close();

    // console.log('Finish .....');
    // console.log(fileteredItems);
    // return fileteredItems;


}

module.exports = Crawler;