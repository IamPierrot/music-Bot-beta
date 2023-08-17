const { QueueRepeatMode } = require('discord-player');
const { EmbedBuilder } = require('discord.js');

/**
 * 
 * @param {import('discord.js').ChatInputCommandInteraction} interaction 
 */

module.exports = async ({ interaction, queue }) => {
     const methods = ['Lặp bài hát', 'Lặp cả hàng chờ', 'tắt vòng lặp'];
     const noMusic = new EmbedBuilder()
          .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })

     if (!queue || !queue.isPlaying()) {
          await interaction.reply({ embeds: [noMusic] });


     } else {

          const repeatMode = queue.repeatMode;
          switch (repeatMode) {
               case 0:
                    queue.setRepeatMode(QueueRepeatMode.TRACK)
                    break;
               case 1:
                    queue.setRepeatMode(QueueRepeatMode.QUEUE)
                    break;
               case 2:
                    queue.setRepeatMode(QueueRepeatMode.OFF)
                    break;
               default:
                    break;
          }

          const loopEmbed = new EmbedBuilder()
               .setDescription(`Thiết lập chế độ : **${methods[repeatMode]}** ✅`)

          await interaction.reply({ embeds: [loopEmbed] , ephemeral: false});
     }


}