const { EmbedBuilder } = require('discord.js');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = {
     name: 'help',
     description: "xem tất cả lệnh mà em đang có",
     showHelp: false,

     callback: (client, interaction) => {
          const commands = getLocalCommands().filter(x => x.showHelp !== false && x.deleted !== true);

          const embed = new EmbedBuilder()
               .setColor('#ff0000')
               .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
               .setDescription('💙 Đây là tất cả các lệnh mà bot đang có!\n 💙 Sử dụng cú pháp /{tên lệnh}\n 💙 Hiện tại bot không hỗ trợ Prefix Commands')
               .addFields([{ name: `Đang sử dụng - ${commands.length} `, value: commands.map(x => `\`${x.name}\``).join(' | ') }])
               .setTimestamp()
               .setFooter({ text: 'Am nhac di truoc - Tinh yeu theo sau ❤️', iconURL: interaction.user.avatarURL({ dynamic: true }) });

          interaction.editReply({ embeds: [embed] });
     },
};