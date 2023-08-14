const {EmbedBuilder} = require('discord.js');

module.exports = async ({ interaction , queue}) => {
     const noMusic = new EmbedBuilder()
               .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })
     if (!queue || !queue.isPlaying()) await interaction.editReply({embeds: [noMusic]});

     const resumed = queue.node.resume();
     let message = `Tiếp tục hát bài nhạc ${queue.currentTrack.title} ✅`;

     if (!resumed) {
          queue.node.pause();
          message = `Tạm dừng hát bài nhạc ${queue.currentTrack.title} ❌`
     }

     await interaction.editReply({content: message , emphemeral: true});
}