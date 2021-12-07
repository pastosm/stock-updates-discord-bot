const { SlashCommandBuilder } = require('@discordjs/builders');
const iex = require('../iex');
const { watchlistModel } = require('../schemas/watchlist-schema');
const mongo = require('../mongo');

const data = new SlashCommandBuilder()
	.setName('watchlist')
	.setDescription('Add a stock to your watchlist')
	.addSubcommand(subcommand =>
		subcommand.setName('add')
			.setDescription('Add a stock to watchlist')
			.addStringOption(option =>
				option.setName('stock')
					.setDescription('Stock name')
					.setRequired(true),
			));

async function execute(interaction) {
	const { user, options } = interaction;
	console.log('id', user.id);
	console.log('option_name', options.get('stock').value);

	await mongo().then(async (mongoose) => {
		try {
			await watchlistModel
				.findOneAndUpdate(
					{ _id: user.id },
					{ $push: { stockName: options.get('stock').value } },
					{ upsert: true },
				)
				.exec();
		}
		finally {
			mongoose.connection.close();
		}
	});
}

module.exports = {
	data: data,
	execute: execute,

};