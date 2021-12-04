module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		handleInteraction(interaction);
	},
};

function handleInteraction(interaction) {
	if (!interaction.isCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction (${interaction.commandName})`);
		command.execute(interaction);
	}
	catch (error) {
		console.log(error);
		interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}
