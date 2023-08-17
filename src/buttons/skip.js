const { EmbedBuilder } = require("discord.js");
const { QueueRepeatMode } = require('discord-player');

module.exports = async ({ interaction, queue }) => {
     const noMusic = new EmbedBuilder()
          .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })

     if (!queue || !queue.isPlaying()) return await interaction.reply({ embeds: [noMusic] });

     queue.setRepeatMode(QueueRepeatMode.OFF);
     const success = queue.node.skip();

     const skipEmbed = new EmbedBuilder()
          .setAuthor({ name: `⏭ Đã bỏ qua bài nhạc đang phát ${queue.currentTrack.title} ` });

     await interaction.reply({ embeds: [skipEmbed] });
}    