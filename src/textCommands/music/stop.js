const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
     name: 'stop',
     description: 'cho em cook khỏi voice',
     voiceChannel: true,

     callback: async (client, message, args) => {
          const noMusic = new EmbedBuilder()
               .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })
          const queue = useQueue(message.guild);

          if (!queue || !queue.isPlaying()) return await message.reply({ embeds: [noMusic] });
          queue.delete();

          const stopEmbed = new EmbedBuilder()
               .setColor('#b72563')
               .setAuthor({ name: 'Nhà ngươi đã cho ta ngừng hát 🤬', iconURL: message.author.displayAvatarURL() })


          await message.reply({ embeds: [stopEmbed] });

     },
}