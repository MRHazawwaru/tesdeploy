const YahooFinanceAPI = require('./lib');
const express = require('express');
const open = require('open');
const apiDetails = require('./api_key');

const app = express();
const api = new YahooFinanceAPI(apiDetails);
const router = new express.Router();

router.get('/', (req, res) => {
  res.json({status: 'ok', version: '3.2.0'});
});

/**
 * @desc Realtime Quote data
 * @example http://localhost:3000/api/quote/realtime/yhoo,aapl,msft
 */
router.get('/quote/realtime/:tickers', (req, res) => {
  api
    .getRealtimeQuotes(req.params.tickers)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc Forex data
 * @example http://localhost:3000/api/forex/eurusd,gbpusd,cadusd
 */
router.get('/forex/:exchanges', (req, res) => {
  api
    .getForexData(req.params.exchanges)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc News Headlines by ticker
 * @example http://localhost:3000/api/news/headlines/aapl
 */
router.get('/news/headlines/:ticker', (req, res) => {
  api
    .getHeadlinesByTicker(req.params.ticker)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc Ticker search
 * @example http://localhost:3000/api/ticker/search/Apple%20Inc.?region=US&lang=en-US
 */
router.get('/ticker/search/:searchterm', (req, res) => {
  api
    .tickerSearch(req.params.searchterm, req.query.region, req.query.lang)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * NEW OR UPDATED IN v3
 */

/**
 * @desc intraday chart data (UPDATED)
 * @example http://localhost:3000/api/chart/intraday/AAPL?interval=2m&prePost=true
 */
router.get('/chart/intraday/:ticker', (req, res) => {
  api
    .getIntradayChartData(req.params.ticker, req.query.interval, req.query.prePost)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc historical chart data (UPDATED)
 * @example http://localhost:3000/api/chart/historical/AAPL?interval=1d&range=1y
 */
router.get('/chart/historical/:ticker', (req, res) => {
  api
    .getHistoricalData(req.params.ticker, req.query.interval, req.query.range)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc company info
 * @example http://localhost:3000/api/ticker/info/AAPL
 */
router.get('/ticker/info/:ticker', (req, res) => {
 api
   .quoteSummary(req.params.ticker)
   .then(data => res.json(data))
   .catch(err => res.json(err));
});

/**
 * @desc option chain
 * @example http://localhost:3000/api/ticker/options/AAPL
 */
router.get('/ticker/options/:ticker', (req, res) => {
 api
   .optionChain(req.params.ticker)
   .then(data => res.json(data))
   .catch(err => res.json(err));
});

/**
 * @desc recommendations
 * @example http://localhost:3000/api/ticker/recommendations/AAPL
 */
router.get('/ticker/recommendations/:ticker', (req, res) => {
 api
   .recommendations(req.params.ticker)
   .then(data => res.json(data))
   .catch(err => res.json(err));
});

/**
 * @desc futures
 * @example http://localhost:3000/api/markets/futures?market=NQ=F
 *
 * S&P 500: ES=F
 * NASDAQ: NQ=F
 * DOW JONES: YM=F
 */
router.get('/markets/futures', (req, res) => {
  api
    .futures(req.query.market)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc futures
 * @example http://localhost:3000/api/markets/commodities?commodities=GC=F,SI=F,PL=F,HG=F
 */
router.get('/markets/commodities', (req, res) => {
  api
    .commodities(req.query.commodities)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.use('/api', router);

// Demo HTML page at : http://localhost:3000/
app.get('/', (req, res) => res.sendFile(__dirname + '/demo.html'));

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000/');
  console.log('API available at http://localhost:3000/api');

  open('http://localhost:3000/');
});
