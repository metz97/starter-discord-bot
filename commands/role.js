const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('set role')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('role name')
				.setMaxLength(100)
				.setRequired(true)),
	async execute(interaction) {
		try {
			const input = interaction.options.getString('input') ?? '';

			if (input.length > 0) {
				interaction.guild.roles.create({ name: input });
				await interaction.reply({ content: `role ${input} has been created`, ephemeral: true });
			}
			else {
				await interaction.reply({ content: `role name is required`, ephemeral: true });
			}			
		}
		catch (error) {
			console.log(error)
        }
	},
};