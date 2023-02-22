const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('embed message'),
	async execute(interaction) {
		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Notification Roles')
			.setURL('https://discordapp.com/users/378543913658482691')
			.setAuthor({ name: 'YuriHa', iconURL: 'https://i.imgur.com/k8Yw0Rs.jpeg', url: 'https://discordapp.com/users/378543913658482691' })
			.setDescription('React to assign roles that you want to get notifications from.')
			.setThumbnail('https://i.imgur.com/k8Yw0Rs.jpeg')
			//.addFields(
			//	{ name: 'Regular field title', value: 'Some value here' },
			//	{ name: '\u200B', value: '\u200B' },
			//	{ name: 'Inline field title', value: 'Some value here', inline: true },
			//	{ name: 'Inline field title', value: 'Some value here', inline: true },
			//)
			//.addFields({ name: 'Inline field title', value: '<:grinning:>', inline: true })
			.addFields({ name: '<#1075252834846638080>', value: ':one: react for rare-items' })
			.addFields({ name: '<#1075252888814768168>', value: ':two: react for no-enchants' })
			.addFields({ name: '<#1075259678809935992>', value: ':three: react for arcane' })
			.addFields({ name: '<#1075259719670841394>', value: ':four: react for anti-mage' })
			.addFields({ name: '<#1075259743335096370>', value: ':five: react for arch' })
			.addFields({ name: '<#1075259767737561200>', value: ':six: react for armor-breaking' })
			.addFields({ name: '<#1075259786339291201>', value: ':seven: react for blashpemy' })
			.addFields({ name: '<#1075259812637585471>', value: ':eight: react for armor' })
			.addFields({ name: '<#1075259840567451699>', value: ':nine: react for divine-blessing' })
			.addFields({ name: '<#1075260184328421399>', value: ':keycap_ten: react for insight' })
			.addFields({ name: '<#1075260208357584936>', value: ':1234: react for magic' })
			.addFields({ name: '<#1075260228813205514>', value: ':hash: react for sharp' })
			.addFields({ name: '<#1075260239923908648>', value: ':asterisk: react for morale' })
			.addFields({ name: '<#1075260261755277352>', value: ':eject: react for sharp-blade' })
			.addFields({ name: '<#1075260285369196545>', value: ':arrow_forward: react for tenacity' })
			.addFields({ name: '<#1075260330306961428>', value: ':pause_button: react for zeal' })
			.setImage('https://i.imgur.com/k8Yw0Rs.jpeg')
			.setTimestamp()
			.setFooter({ text: 'YuriHa - Memory Of Faith', iconURL: 'https://i.imgur.com/k8Yw0Rs.jpeg' });
		const message = await interaction.reply({ embeds: [exampleEmbed], fetchReply: true });
		try {
			await message.react(`1️⃣`);
			await message.react(`2️⃣`);
			await message.react(`3️⃣`);
			await message.react(`4️⃣`);
			await message.react(`5️⃣`);
			await message.react(`6️⃣`);
			await message.react(`7️⃣`);
			await message.react(`8️⃣`);
			await message.react(`9️⃣`);
			await message.react(`🔟`);
			await message.react(`🔢`);
			await message.react(`#️⃣`);
			await message.react(`*️⃣`);
			await message.react(`⏏️`);
			await message.react(`▶️`);
			await message.react(`⏸️`);
		} catch (error) {
			console.error('One of the emojis failed to react:', error);
		}
		const filter = (reaction, user) => {
			return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣',
				'*️⃣', '⏏️', '▶️', '⏸️']
				.includes(reaction.emoji.name);
		};

		const collector = message.createReactionCollector({ filter });

		collector.on('collect', (reaction, user) => {
			console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
		});

		collector.on('end', collected => {
			console.log(`Collected ${collected.size} items`);
		});
		//const message = await interaction.fetchReply();
		//console.log(message);
	},
};