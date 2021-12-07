const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const watchlistSchema = mongoose.Schema({
	_id: reqString,
	watchlistStocks: [{ stockName: String }],
});

module.exports = {
	watchlistModel: mongoose.model('watchlist', watchlistSchema),
};