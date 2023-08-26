const { EmbedBuilder } = require('discord.js');
const getLocalCommands = require('../../utils/getLocalCommands');
const getTextCommands = require('../../utils/getTextCommands.js')


module.exports = {
     name: 'help',
     description: "xem tất cả lệnh mà em đang có",
     showHelp: false,

     callback: async (client, message, args) => {
          const commands = getLocalCommands().filter(x => x.showHelp !== false && x.deleted !== true);
          const text = getTextCommands().filter(x => x.showHelp !== false && x.deleted !== true);


          const embed = new EmbedBuilder()
          .setColor('#ff0000')
          .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
          .setDescription('* **Các chú ý sử dụng Bot** \n * **Điều 1:** "anti prefix" (nqg1 + {tên command})\n * **Điều 2:** Chắc chắn prefix commands sẽ ít hơn slash command\n * **Điều 3:** Bot đang trong quá trình phát triển, nếu có lỗi liên hệ Pierrot 💙\n Chúc các bạn vui vẻ khi sử dụng bot <3')
          .addFields([{ name: `Slash commands đang sử dụng - ${commands.length} `, value: commands.map(x => `\`${x.name}\``).join(' | ') }, { name: `Prefix commands đang sử dụng - ${text.length} `, value: text.map(x => `\`${x.name}\``).join(' | ') }])
          .setTimestamp()
          .setFooter({ text: 'Âm nhạc đi trước - Tình yêu theo sau ❤️', iconURL: message.author.displayAvatarURL({ dynamic: true }) });
          await message.reply({ embeds: [embed] });
     },
};