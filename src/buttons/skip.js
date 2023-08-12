const { EmbedBuilder } = require("discord.js");
const { QueueRepeatMode } = require('discord-player');

module.exports = async ({ interaction, queue }) => {
     const noMusic = new EmbedBuilder()
          .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })

     if (!queue || !queue.isPlaying()) return await interaction.editReply({ embeds: [noMusic] });

     const playedCommand = new Set();
     const track = queue.currentTrack;
     playedCommand.add(track.requestedBy.id);

     if (playedCommand.has(interaction.user.id)) {
          queue.setRepeatMode(QueueRepeatMode.OFF);
          const success = queue.node.skip();

          const skipEmbed = new EmbedBuilder()
               .setAuthor({ name: `⏭ Đã bỏ qua bài nhạc đang phát ${queue.currentTrack.title} ` });

          await interaction.editReply({ embeds: [skipEmbed] });
     } else {
          await interaction.editReply({
               embeds: [new EmbedBuilder()
                    .setColor('Red')
                    .setDescription(
                         `❌ Người yêu cầu bài này là :${track.requestedBy.toString()}\n❌ Không thể bỏ qua bài hát ⏭`)]
          })
     }
}    