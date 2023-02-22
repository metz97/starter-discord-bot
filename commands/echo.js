const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back')
				// Ensure the text will fit in an embed description, if the user chooses that option
				.setMaxLength(2000))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to echo into')
				// Ensure the user can only select a TextChannel for output
				.addChannelTypes(ChannelType.GuildText))
		.addBooleanOption(option =>
			option.setName('embed')
				.setDescription('Whether or not the echo should be embedded')),
	async execute(interaction) {
		const str = interaction.options.getString('input');
		console.log(str);
		const ch = interaction.options.getChannel('channel');
		console.log(ch.id);
		const emb = interaction.options.getBoolean('embed');
		console.log(emb);
		await interaction.reply(`${str} ${ch.id} ${emb}`);
		//const target = interaction.options.getUser('target');
		//const reason = interaction.options.getString('reason') ?? 'No reason provided';

		//await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
		//await interaction.guild.members.ban(target);
	},
};