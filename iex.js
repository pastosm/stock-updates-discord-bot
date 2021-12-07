const { Client } = require('iexjs');
const { IEXKey } = require('./config.json');

const client = new Client({ api_token: IEXKey, version: 'sandbox' });


async function symbolExists(symbol) {
	try {
		const response = await client.iexSymbolsList();
		if (response.includes(symbol)) {
			return true;
		}
	}
	catch (error) {
		console.error(`API call for ${symbolExists.name} failed`, error);
	}
}

async function getStockData(stockTicker) {
	try {
		const response = await client.chart({ symbol: stockTicker, range: '1d' });
		const data = {
			symbol: response.symbol,
			companyName : response.companyName,
			primaryExchange: response.primaryExchange,
			open: response.open,
			close : response.open,
			high: response.high,
			low: response.low,
			latestTime: response.latestTime,
		};
		console.log(response);
		return data;
	}
	catch (error) {
		console.error(`API call for ${getStockData.name} failed`, error);
	}


}


module.exports = {
	symbolExists : symbolExists,
	getStockData : getStockData,
};
