const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const iex = require('../iex.js');


// Get the interaction argument
// Match the stock name to symbol (i.e. Apple -> AAPL)
// Perform the api call
// Display the content nicely

// TODO later:
// Add the option of price period


const data = new SlashCommandBuilder()
	.setName('price')
	.setDescription('Get the price of a stock')
	.addStringOption(option =>
		option.setName('stock_name')
			.setDescription('Get the current stock price')
			.setRequired(true));


function sendEmbed(stockData) {
	const embedMessage = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(`${stockData.companyName}'s Stock Price`)
		.setDescription(`${stockData.companyName}'s price on ${stockData.latestTime} was $${stockData.close}.`)
		.setTimestamp()
		.setFooter('Data provided by IEX Cloud.');

	return [embedMessage];

}


async function execute(interaction) {
	const stockName = interaction.options.get('stock_name').value;

	if (await iex.symbolExists(stockName)) {
		const stockData = await iex.getStockData(stockName);
		const replyMsg = `${stockData.companyName}'s (${stockData.stockName}) price on ${stockData.latestTime} was $${stockData.close}.`;
		interaction.reply({ content: replyMsg, embeds: sendEmbed(stockData) });
	}
	else {
		interaction.reply({ content: `Could not fetch data for ${stockName}. Perhaps ticker symbol was incorrect?`, ephemeral: true });
	}
}

module.exports = {
	data : data,
	execute : execute,
};

