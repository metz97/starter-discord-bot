const { Events } = require('discord.js');
require('dotenv').config()
const ownerId = process.env.OWNER_ID;

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		if (interaction.user.id !== ownerId) {
			await interaction.reply({ content: `You are not authorized to use the command!`, ephemeral: true });
			return;
        }			

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};