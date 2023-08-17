const { EmbedBuilder } = require('discord.js');

module.exports = async ({ interaction, queue }) => {
     const noMusic = new EmbedBuilder()
          .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })
     if (!queue || !queue.isPlaying()) return await interaction.reply({ embeds: [noMusic] });

     const resumed = queue.node.resume();
     let message = `Tiếp tục hát bài nhạc ${queue.currentTrack.title} ✅`;

     if (!resumed) {
          queue.node.pause();
          message = `Tạm dừng hát bài nhạc ${queue.currentTrack.title} ❌`
     }

     await interaction.reply({ content: message, emphemeral: false });
}