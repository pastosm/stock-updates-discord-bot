const mongo = require('../mongo');


module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		await mongo().then(mongoose => {
			try {
				console.log('Connected to Mongo');
			}
			finally {
				mongoose.connection.close();
			}
		});
	},
};