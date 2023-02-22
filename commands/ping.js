const { SlashCommandBuilder, roleMention } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		//await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
		//await interaction.reply(`Websocket heartbeat: ${client.ws.ping}ms.`);
		//const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true, ephemeral: true });
		//interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
		//<@& ${ roleId }>
		const role = roleMention('1076741296644952064');
		await interaction.reply({ content: `${role} has mentioned`, ephemeral: true });
		//const message = await interaction.fetchReply();
		console.log(role);
	},
};