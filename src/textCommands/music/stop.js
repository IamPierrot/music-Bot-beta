const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const checkId = require('../../utils/functions/checkIdRequest');

module.exports = {
     name: 'stop',
     description: 'cho em cook khỏi voice',
     voiceChannel: false,

     callback: async (client, message, args) => {
          try {
               const queue = useQueue(message.guild);
               const noMusic = new EmbedBuilder()
                    .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })
               if (!queue || !queue.isPlaying()) return await message.reply({ embeds: [noMusic] });
              
               const check = checkId(queue.currentTrack, message.author.id);
               if (check) {
                    return await message.reply({ embeds: [check], ephemeral: true })
               } else {
                    queue.delete();
                    const stopEmbed = new EmbedBuilder()
                         .setColor('#b72563')
                         .setAuthor({ name: 'Nhà ngươi đã cho ta ngừng hát 🤬', iconURL: message.author.displayAvatarURL() })
     
     
                    await message.reply({ embeds: [stopEmbed] });
               }
               
          } catch (error) {
               console.log('There was an error in stop text commands: ', error);
          }
     },
}