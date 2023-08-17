const { EmbedBuilder } = require('discord.js');
const getTextCommands = require('../../utils/getTextCommands.js');


/**
 * 
 * @param {import('discord.js').Message} message 
 */

module.exports = async (client, message) => {
     const prefix = "!";

     if (message.author.bot || !message.content.startsWith(prefix.toLowerCase())) return;

     const textCommands = getTextCommands();

     const args = message.content.slice(prefix.length).trim().split(/ +/);
     const command = args.shift().toLowerCase();
     
     const commandObject = await textCommands.find(
          (cmd) => cmd.name === command
     );
//
     
     if (!commandObject) return;

     if (commandObject.voiceChannel) {
          if (!message.member.voice.channel) return await message.reply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Bạn đang không ở trong phòng Voice`)], ephemeral: true, })
          if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return await message.reply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Bạn đang không ở cùng phòng voice với tui! `)], ephemeral: true, })
     }
     await commandObject.callback(client, message, args);
}