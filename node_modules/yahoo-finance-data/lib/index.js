const yql = require('yql-node');
const rp = require('request-promise');
const Promise = require('bluebird');

/**
 * @class YahooFinanceAPI
 */
class YahooFinanceAPI {
  /**
   * @constructor
   * @param {Object} apiDetails
   * @return undefined
   */
  constructor(apiDetails) {
    if(!apiDetails) {
      throw new Error('You need to provide an API key and secret.');
    }

    this.yql = yql.formatAsJSON().withOAuth(apiDetails.key, apiDetails.secret);

    this.yql.setQueryParameter({
      env: 'store://datatables.org/alltableswithkeys',
      diagnostics: true
    });

    this.xhr = rp;
  }

  /**
   * @method fetch
   * @desc executes a YQL query
   * @param {String} query
   * @return {Promise}
   */
  fetch(query) {
    return new Promise((resolve, reject) => {
      this.yql.execute(query, (err, res) => {
        if(err) {
          reject({error: true, message: err.message});
        }

        if(typeof res === 'object') {
          resolve(res);
        }

        try {
          const data = JSON.parse(res);
          resolve(data);
        } catch(e) {
          reject({error: true, message: e.message});
        }
      });
    });
  }

  /**
   * @method ajax
   * @desc executes an AJAX request
   * @param {String} query
   * @return {Promise}
   */
  ajax(query) {
    return new Promise((resolve, reject) => {
      this.xhr(query)
        .then(raw => {
          try {
            const data = JSON.parse(raw);
            resolve(data);
          } catch(e) {
            reject({error: true, message: e.message});
          }
        })
        .catch(err => {
          reject({error: true, message: err.message});
        });
    });
  }

  /**
   * @method uppercaseList
   * @desc uppercases a raw list of tickers to insert in a query
   * @param {String} rawList
   * @return {String}
   */
  uppercaseList(rawList) {
    return rawList.split(',').map(s => s.toUpperCase()).join(',');
  }

  /**
   * @method getRealtimeQuotes
   * @desc retrieves realtime quote data
   * @param {String} rawSymbolList
   * @return {Promise}
   */
  getRealtimeQuotes(rawSymbolList) {
    const list = this.uppercaseList(rawSymbolList);
    const query = `select * from pm.finance where symbol="${list}"`;
    return this.fetch(query);
  }

  /**
   * @method getHistoricalData
   * @desc retrieves historical data
   * @param {String} symbol
   * @param {String} interval
   * @param {String} range
   * @return {Promise}
   */
  getHistoricalData(symbol, interval = '1d', range = '1y') {
    const query = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?formatted=true&lang=en-US&region=US&interval=${interval}&events=div%7Csplit&range=${range}&corsDomain=finance.yahoo.com`;
    return this.ajax(query);
  }

  /**
   * @method getForexData
   * @desc retrieves foreign exchange data
   * @param {String} exchanges
   * @return {Promise}
   */
  getForexData(exchanges) {
    const list = exchanges.split(',').map(ex => ex.toUpperCase() + '=X').join(',');
    return this.commodities(list);
  }

  /**
   * @method getHeadlinesByTicker
   * @desc retrieves news headlines
   * @param {String} ticker
   * @return {Promise}
   */
  getHeadlinesByTicker(ticker) {
    const query = `select * from pm.finance.articles where symbol in ("${ticker.toUpperCase()}")`;
    return this.fetch(query);
  }

  /**
   * @method getIntradayChartData
   * @desc retrieves intraday data
   * @param {String} ticker
   * @param {String} interval
   * @param {Boolean} prePostData
   * @return {Promise}
   */
  getIntradayChartData(ticker, interval = '2m', prePostData = true) {
    const query = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=1d&includePrePost=${prePostData}&interval=${interval}&corsDomain=finance.yahoo.com&.tsrc=finance`;
    return this.ajax(query);
  }

  /**
   * @method tickerSearch
   * @desc searches for matching tickers based on search term
   * @param {String} searchTerm
   * @param {String} region
   * @param {String} lang
   * @return {Promise}
   */
  tickerSearch(searchTerm, region = 'US', lang = 'en-US') {
    const query = `http://d.yimg.com/aq/autoc?query=${encodeURIComponent(searchTerm)}&region=${region}&lang=${lang}`;
    return this.ajax(query);
  }

  /**
   * @method quoteSummary
   * @desc Retrieves company information based on its ticker
   * @param {String} symbol
   * @return {Promise}
   */
  quoteSummary(symbol) {
    const query = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?formatted=true&lang=en-US&region=US&modules=assetProfile%2CsecFilings&corsDomain=finance.yahoo.com`;
    return this.ajax(query);
  }

  /**
   * @method optionChain
   * @desc Retrieves option chain for a given ticker
   * @param {String} symbol
   * @return {Promise}
   */
  optionChain(symbol) {
    const query = `https://query2.finance.yahoo.com/v7/finance/options/${symbol}?formatted=true&lang=en-US&region=US&corsDomain=finance.yahoo.com`;
    return this.ajax(query);
  }

  /**
   * @method recommendations
   * @desc Retrieves securities recommendations based on a given ticker
   * @param {String} symbol
   * @return {Promise}
   */
  recommendations(symbol) {
    const query = `https://query1.finance.yahoo.com/v6/finance/recommendationsbysymbol/${symbol}`;
    return this.ajax(query);
  }

  /**
   * @method futures
   * @desc Retrieves futures data for a given market
   * @param {String} market
   * @param {String} range
   * @param {String} interval
   * @param {Boolean} prePostData
   * @return {Promise}
   */
  futures(market, range = '5d', interval = '1d', prePostData = false) {
    const query = `https://query1.finance.yahoo.com/v8/finance/chart/${market}?range=${range}&includePrePost=${prePostData}&interval=${interval}&corsDomain=finance.yahoo.com&.tsrc=finance`;
    return this.ajax(query);
  }

  /**
   * @method commodities
   * @desc Retrieves one or more commodities futures data
   * @param {String} commodities
   * @param {String} range
   * @param {String} interval
   * @param {Boolean} prePostData
   * @return {Promise}
   */
  commodities(commodities, range = '1d', interval = '5m', prePostData = false) {
    const query = `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${commodities}&range=${range}&interval=${interval}&indicators=close&includeTimestamps=true&includePrePost=${prePostData}&corsDomain=finance.yahoo.com&.tsrc=finance`;
    return this.ajax(query);
  }
}

module.exports = YahooFinanceAPI;
