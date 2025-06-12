[![Build Status](https://travis-ci.org/stephanepericat/yahoo-finance.svg?branch=master)](https://travis-ci.org/stephanepericat/yahoo-finance)

[![npm version](https://badge.fury.io/js/yahoo-finance-data.svg)](https://badge.fury.io/js/yahoo-finance-data)

[![NPM](https://nodei.co/npm/yahoo-finance-data.png)](https://nodei.co/npm/yahoo-finance-data/)

# yahoo-finance

A node wrapper to call the various Yahoo! Finance API's.

> Some services have been deprecated by Yahoo! as of May 18th, 2017. Please see API docs below.

## Prerequisites

This module requires a Yahoo! API key. [More info here](https://developer.yahoo.com/apps/create/).

## Install

```shell
npm install yahoo-finance-data
```

## Getting started

```js
const YahooFinanceAPI = require('yahoo-finance-data');

const api = new YahooFinanceAPI({
  key: 'mylongyahooapikey',
  secret: 'mylongyahooapisecret'
});
```

## API

### getQuotes(symbolList)

> DEPRECATED AS OF 3.2

### getReatimeQuotes(symbolList)

Retrieves realtime quote data for one or more securities.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| symbolList   | String  | the ticker list, comma-separated |

```js
api
  .getRealtimeQuotes('YHOO,MSFT,AAPL')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### getHistoricalData(symbol, [interval, range])

> UPDATED IN v3!

Retrieves historical data for a given security.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| symbol       | String  | the ticker |
| interval     | String  | OPTIONAL interval between data points (default: 1d) |
| range        | String  | OPTIONAL data range (default: 1y) |

*Valid ranges*:
`["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"]`

```js
api
  .getHistoricalData('AAPL', '1d', '1y')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### getForexData(exchanges)

> UPDATED IN v3.2 !

Retrieves forex data for one or multiple currency pairs.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| exchanges    | String  | the list of currency pairs, comma-separated |

```js
api
  .getForexData('eurusd,gbpusd,cadusd')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### getHeadlinesByTicker(ticker)

Retrieves news headlines for a given security.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| ticker       | String  | the ticker |

```js
api
  .getHeadlinesByTicker('AAPL')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### getIntradayChartData(ticker, [interval, prePostData])

> UPDATED IN v3!

Retrieves intraday chart data for a given security.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| ticker       | String  | the ticker |
| interval     | String  | OPTIONAL time interval for data points (default: 2m) |
| prePostData  | Boolean | OPTIONAL add pre/post data (default: true) |

```js
api
  .getIntradayChartData('AAPL', '2m', true)
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### tickerSearch(searchTerm, [region, lang])

Retrieves matches for a given search term.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| searchTerm   | String  | the search query |
| region       | String  | OPTIONAL the region (default: US) |
| lang         | String  | OPTIONAL the language (default: en-US) |

```js
api
  .tickerSearch('Apple Inc.', 'US', 'en-US')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### quoteSummary(ticker)

> NEW IN v3!

Retrieves company information based on its ticker.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| ticker       | String  | the ticker |

```js
api
  .quoteSummary('AAPL')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### optionChain(ticker)

> NEW IN v3!

Retrieves option chain for a given ticker.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| ticker       | String  | the ticker |

```js
api
  .optionChain('AAPL')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### recommendations(ticker)

> NEW IN v3!

Retrieves securities recommendations based on a given ticker.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| ticker       | String  | the ticker |

```js
api
  .recommendations('AAPL')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### futures(market, [range, interval, prePostData])

> NEW in v3.1!

Retrieves futures data for a given market.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| market       | String  | the market symbol |
| range        | String  | OPTIONAL the amount of days (default: 5d) |
| interval     | String  | OPTIONAL time interval for data points (default: 1d) |
| prePostData  | Boolean | OPTIONAL add pre/post data (default: false) |

```js
api
  .futures('NQ=F')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### commodities(commodities, [range, interval, prePostData])

> NEW in v3.1!

Retrieves one or more commodities futures data.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| commodities  | String  | the list of commodities (comma-separated) |
| range        | String  | OPTIONAL the amount of days (default: 1d) |
| interval     | String  | OPTIONAL time interval for data points (default: 5m) |
| prePostData  | Boolean | OPTIONAL add pre/post data (default: false) |

```js
api
  .commodities('GC=F,SI=F,PL=F,HG=F')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```
