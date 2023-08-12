const { EmbedBuilder } = require('discord.js');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = {
     name: 'help',
     description: "All the commands this bot has!",
     showHelp: false,

     callback: (client, interaction) => {
          const commands = getLocalCommands().filter(x => x.showHelp !== false && x.deleted !== true);

          const embed = new EmbedBuilder()
               .setColor('#ff0000')
               .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
               .setDescription('Code tren mang')
               .addFields([{ name: `Đang sử dụng - ${commands.length} `, value: commands.map(x => `\`${x.name}\``).join(' | ') }])
               .setTimestamp()
               .setFooter({ text: 'Am nhac di truoc - Tinh yeu theo sau ❤️', iconURL: interaction.member.avatarURL({ dynamic: true }) });

          interaction.editReply({ embeds: [embed] });
     },
};