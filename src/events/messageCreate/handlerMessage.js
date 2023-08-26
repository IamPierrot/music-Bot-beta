const { EmbedBuilder } = require('discord.js');
const getTextCommands = require('../../utils/getTextCommands.js');
/**
 * 
 * @param {import('discord.js').Message} message 
 */

module.exports = async (client, message) => {
     try {
          global.prefix = "?";
       
          if (message.author.bot || !message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

          const textCommands = getTextCommands();

          const args = message.content.slice(prefix.length).trim().split(/ +/);
          const command = args.shift().toLowerCase();

          const commandObject = await textCommands.find(
               (cmd) => cmd.name === command
          );
          //

          if (!commandObject) return;

          if (commandObject.adminOnly && !configure.opt.idDev.includes(message.author.id)) return await message.reply("❌ Lệnh này chỉ dành cho Dev");
          // const DJdata = configure.opt.DJ;
          // if (DJdata.enable && commandObject.DJPermissions) {
          //      if (!message.member.roles.cache.find(role => role.name === DJdata.roleName)) {
          //           const permissionDJ = new EmbedBuilder()
          //                .setAuthor({ name: `❌ | Bạn không có quyền xài lệnh này.` })
          //                .setDescription(`Quyền hạn thuộc về người có role **${DJdata.roleName}**`)
     
          //           return await message.reply({ embeds: [permissionDJ] })
          //           .then((msg) => setTimeout(() => msg.delete(),15000));
          //      }
          // }
          if (commandObject.voiceChannel) {
               if (!message.member.voice.channel) return await message.reply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Bạn đang không ở trong phòng Voice`)], ephemeral: true, })
               if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return await message.reply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Bạn đang không ở cùng phòng voice với tui! `)], ephemeral: true, })
          }


          await commandObject.callback(client, message, args);

     } catch (error) {
          console.log("There was an error in handlerMessage: ", error);

     }
}